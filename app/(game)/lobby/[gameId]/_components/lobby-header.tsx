import { Button } from "@/components/ui/button";
import { Play, Users } from "lucide-react";
import { LeaveGameAlert } from "./leave-game-alert";

interface LobbyHeaderProps {
  isHost: boolean;
  playerCount: number;
  gameId: string;
}

export const LobbyHeader = ({ playerCount, isHost, gameId }: LobbyHeaderProps) => {
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
        <Button disabled={!isHost} variant="destructive">
          <Play />
          <span>Start Game</span>
        </Button>
      </div>
    </div>
  );
};
