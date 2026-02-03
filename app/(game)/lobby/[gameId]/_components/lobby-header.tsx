"use client";

import { Button } from "@/components/ui/button";
import { Play, Users } from "lucide-react";
import { LeaveGameAlert } from "./leave-game-alert";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api/client";

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
  const [ready, setReady] = useState(false);

  const onReady = async () => {
    try {
      await api.post("/game/ready", { gameId })

      
      setReady(true);
    } catch (error) {
      console.error("error in lobby-header", error)
    }
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
          <Button disabled={ready} onClick={onReady} variant="success">
            <Play />
            <span>Ready</span>
          </Button>
        )}
      </div>
    </div>
  );
};
