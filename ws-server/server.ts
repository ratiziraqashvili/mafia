import { Server } from "socket.io"
import * as http from "http"

const server = http.createServer();
const io = new Server(server, {
    cors: {
        origin: "*"
    }
})


// Join a lobby room
io.on("connection", (socket) => {
    console.log("Client connected: ", socket.id);

    socket.on("join_lobby", ({ gameId, playerId }: { gameId: string; playerId: string }) => {
        socket.join(gameId);

        // Broadcast to everyone else in the lobby
        socket.to(gameId).emit("player_joined", { playerId });
    })
    
    // Leave a lobby
    socket.on("leave_lobby", ({ gameId, playerId }: { gameId: string; playerId: string }) => {
        socket.leave(gameId);

        socket.to(gameId).emit("player_left", { playerId });
    });
    
    socket.on("disconnect", () => {
        console.log("Client disconnected: ", socket.id);
    });
});

// Listen on a port
server.listen(3001, () => console.log("WS server running on port 3001"))