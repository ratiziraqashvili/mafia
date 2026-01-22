import { Check } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface ProfilePictureProps {
  size: "default" | "sm" | "lg" | "xl" | "2xl" | null | undefined;
  src: string | null;
  username: string | null;
  className?: string;
  isReady?: boolean;
}

export const ProfilePicture = ({
  size,
  src,
  username,
  className,
  isReady,
}: ProfilePictureProps) => {
  return (
    <Avatar className={className} size={size}>
      <AvatarImage src={src ?? undefined} alt="PFP" />
      <AvatarFallback>
        <span className="text-red-400 text-lg">
          {username?.slice(0, 2).toUpperCase()}
        </span>
      </AvatarFallback>
      {isReady && (
        <span className="absolute -bottom-1 size-6 -right-1 bg-green-600 rounded-full flex items-center justify-center border-2 border-zinc-900 shadow-lg">
          <Check size={16} />
        </span>
      )}
    </Avatar>
  );
};
