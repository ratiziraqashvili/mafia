import { Server } from "socket.io"
import * as http from "http"
import { auth } from "../lib/auth/auth";
import { prisma } from "../lib/db/prisma";
import { generateSeatNumber } from "../lib/game/generate-seat-number"

const server = http.createServer();
const io = new Server(server, {
    cors: {
        origin: "*"
    }
})

io.use(async (socket, next) => {
    try {
        const token = socket.handshake.auth.token || socket.handshake.headers.cookie
    
        const session = await auth.api.getSession({
            headers: {
            cookie: token
        }
      })

        if (!session) {
            return next(new Error("Auth failed on WS"))
        }

        socket.data.userId = session.user.id;
        socket.data.user = session.user;

        next();
    } catch (error) {
        console.error("Socket auth error: ", error);
        next(new Error("Failed to auth on WS"))
    }

})


// Join a lobby room
io.on("connection", (socket) => {
    console.log("Client connected: ", socket.id);

    socket.on("join_lobby", async ({ gameId }: { gameId: string;}) => {
        const userId: string = socket.data.userId
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

        // Broadcast to everyone else in the lobby
        socket.to(room).emit("player_joined", { userId });
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