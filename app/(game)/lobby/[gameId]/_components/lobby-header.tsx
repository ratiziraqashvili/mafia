"use client";

import { Button } from "@/components/ui/button";
import { Play, Users } from "lucide-react";
import { LeaveGameAlert } from "./leave-game-alert";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { AllReadyPlayers } from "@/types";

interface LobbyHeaderProps {
  isHost: boolean;
  playerCount: number;
  gameId: string;
  userId: string | undefined;
}

let socket: ReturnType<typeof io>;

export const LobbyHeader = ({
  playerCount,
  isHost,
  gameId,
  userId,
}: LobbyHeaderProps) => {
  const [readyPlayers, setReadyPlayers] = useState<AllReadyPlayers>();

  useEffect(() => {
    socket = io(process.env.NEXT_PUBLIC_WEB_SOCKET_URL!);

    return () => {
      socket?.disconnect();
    };
  }, [])

  const onReady = () => {
    socket.emit("player_ready", { gameId, userId, ready: true });
  };

  return (
    <div className="pt-8 flex justify-between items-center">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl text-white">Waiting Room</h1>
        <h3 className="text-muted-foreground text-md flex items-center gap-2 font-medium">
          <Users size={16} />
          <span>{playerCount} / 12 Players</span>
        </h3>
      </div>
      <div className="flex items-center gap-2">
        <LeaveGameAlert gameId={gameId} />
        {isHost ? (
          <Button variant="destructive">
            <Play />
            <span>Start Game</span>
          </Button>
        ) : (
          <Button onClick={onReady} variant="success">
            <Play />
            <span>Ready</span>
          </Button>
        )}
      </div>
    </div>
  );
};
