import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface ProfilePictureProps {
    size: "default" | "sm" | "lg" | "xl" | "2xl" | null | undefined;
    src: string | null;
    username: string | null;
}

export const ProfilePicture = ({ size, src, username }: ProfilePictureProps) => {
  return (
    <Avatar size={size}>
      <AvatarImage src={src ?? undefined} alt="PFP" />
      <AvatarFallback>
        <span className="text-[#ff6467] text-lg">
            {username?.slice(0, 2).toUpperCase()}
        </span>
      </AvatarFallback>
    </Avatar>
  );
};
