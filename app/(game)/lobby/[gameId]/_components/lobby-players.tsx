"use client";

import { CurrentLobbyPlayers } from "@/types";
import { LobbyPlayerCard } from "./lobby-player-card";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

interface LobbyPlayersProps {
  players: CurrentLobbyPlayers;
  isReady: boolean;
  isHost: boolean;
  hostId: string | undefined;
  gameId: string;
  userId: string | undefined;
}

let socket: ReturnType<typeof io>;

export const LobbyPlayers = ({
  players: initialPlayers,
  isReady,
  hostId,
  gameId,
  userId,
}: LobbyPlayersProps) => {
  const [players, setPlayers] = useState(initialPlayers);

  useEffect(() => {
    socket = io(process.env.NEXT_PUBLIC_WEB_SOCKET_URL!);

    //Join lobby
    socket.emit("join_lobby", { gameId, userId });

    //Listen for new players
    socket.on("player_joined", (data) => {
      if (!data || !data.userId) {
        console.error("Invalid player_joined data: ", data);
        return;
      }

      console.log(data);

      const { userId, username, image } = data;
      setPlayers((prev) => {
        if (prev.some((p) => p.userId === userId)) return prev;
        return [...prev, { userId, user: { username, image } } as any];
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [gameId, userId]);

  const playersWithCorrectSeat = new Array(12);

  players.forEach((p) => (playersWithCorrectSeat[p.seatNumber] = p));

  return (
    <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 ">
      {players.map((player) => {
        const isHostPlayer = player.userId === hostId;

        return (
          <LobbyPlayerCard
            isReady={isReady}
            isHost={isHostPlayer}
            key={player.id}
            username={player.user.username}
            profilePicture={player.user.image}
          />
        );
      })}
    </div>
  );
};
