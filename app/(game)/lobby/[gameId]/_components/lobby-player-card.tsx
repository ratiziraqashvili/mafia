import { ProfilePicture } from "@/components/profile-picture";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Crown } from "lucide-react";

interface LobbyPlayerCardProps {
  profilePicture: string | null;
  username: string | null;
  isHost: boolean;
  isReady: boolean;
}

export const LobbyPlayerCard = ({
  profilePicture,
  username,
  isHost,
  isReady,
}: LobbyPlayerCardProps) => {
  return (
    <div
      className={cn(
        "bg-[#151518] p-6 flex items-center gap-2 rounded-xl border-2 transition-all  backdrop-blur-sm",
        isReady
          ? "border-green-900/50 bg-green-950/10 shadow-lg shadow-green-900/10"
          : "border-zinc-800 hover:border-zinc-700",
      )}
    >
      <div className="relative">
        <ProfilePicture
          className={cn(
            "border-2  bg-black relative",
            isReady ? "border-green-700" : "border-zinc-700",
          )}
          src={profilePicture}
          username={username}
          size="2xl"
        />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <h2 className="text-[#e0e1e0]">{username}</h2>
          {isHost && <Crown color="#e3a701" size={16} />}
        </div>
        <div className="space-x-2">
          {isReady ? (
            <Badge variant="success">Ready</Badge>
          ) : (
            <Badge variant="outline">Waiting</Badge>
          )}
          {isHost && <Badge variant="host">Host</Badge>}
        </div>
      </div>
    </div>
  );
};
