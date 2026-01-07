import { Button } from "@/components/ui/button";
import { LogOut, Play, Users } from "lucide-react";

interface LobbyHeaderProps {
  playerCount: number;
}

export const LobbyHeader = ({ playerCount }: LobbyHeaderProps) => {
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
        <Button variant="secondary">
          <LogOut />
          <span>Leave Lobby</span>
        </Button>
        <Button variant="destructive">
          <Play />
          <span>Start Game</span>
        </Button>
      </div>
    </div>
  );
};
