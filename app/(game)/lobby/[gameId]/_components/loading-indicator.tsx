import { Badge } from "@/components/ui/badge";
import { Check, Clock, LoaderCircle } from "lucide-react";

interface LoadingIndicatorProps {
  playerCount: number;
}

export const LoadingIndicator = ({ playerCount }: LoadingIndicatorProps) => {
  return (
    <div className="bg-[#151518] rounded-xl p-4 border border-[#27272a] flex justify-between">
      {playerCount < 12 ? (
        <p className="flex gap-3 items-center">
          <LoaderCircle className="animate-spin text-red-500" size={16} />
          <span>Waiting for players to join...</span>
        </p>
      ) : (
        <p className="flex gap-3 items-center">
          <Check className="text-green-500" size={16} />
          <span>Waiting for the host to start the game...</span>
        </p>
      )}
      {playerCount < 12 ? (
        <Badge className="space-x-1" variant="outline">
          <Clock />
          <span>{playerCount}/12 ready</span>
        </Badge>
      ) : (
        <Badge variant="success">
          <Check />
          <span>ready</span>
        </Badge>
      )}
    </div>
  );
};
