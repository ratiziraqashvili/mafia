import { Server } from "socket.io";
import http from "http";
import { prisma } from "./lib/db/prisma";
import { generateSeatNumber } from "./lib/game/generate-seat-number";

const server = http.createServer();
const io = new Server(server, {
    cors: {
        origin: "*",
    }
})

// Join a lobby room
io.on("connection", (socket) => {
    
    socket.on("join_lobby", async ({ gameId, userId }: { gameId: string; userId: string}) => {
        try {
            const seatNumber = await generateSeatNumber(gameId);
                
            await prisma.player.upsert({
                where: {
                    userId_gameId: {
                        userId,
                        gameId
                    }
                },
                update: {},
                create: { 
                    userId,
                    gameId,
                    seatNumber
                }
            })
            
            const room = `game:${gameId}`
            socket.join(room);

            const user = await prisma.user.findUnique({
                where: { id: userId },
                select: { username: true, image: true }
            });

            if (!user) {
                console.error("User not found: ", userId);
                return;
            }

            const payload = { userId, username: user?.username, image: user?.image };

            // Broadcast to everyone in the lobby
            io.to(room).emit("player_joined", payload)
        } catch (error) {
            console.error("Error in join_lobby:", error);
        }
    })
    
    // Leave a lobby
    socket.on("leave_lobby", ({ gameId }: { gameId: string; }) => {
        const userId: string = socket.data.userId
        const room = `game:${gameId}`

        socket.leave(room);

        socket.to(room).emit("player_left", { userId });
    });
    
    socket.on("disconnect", () => {
        for (const room of socket.rooms) {
            if (room.startsWith("game:")){
                socket.to(room).emit("player_left", { 
                    playerId: socket.data.userId
                 })
            }
        }
    });
});

// Listen on a port
server.listen(3001, () => console.log("WS server running on port 3001"))