import { Eye, Skull, UserPlus } from "lucide-react";

interface StickerProps {
  stickerType: string;
}

export const Sticker = ({ stickerType }: StickerProps) => {
  return (
    <div className="p-2 bg-[#300e0f] rounded-lg">
      {stickerType === "Skull" && <Skull color="#ee2a34" />}
      {stickerType === "Eye" && <Eye color="#ee2a34" />}
      {stickerType === "UserPlus" && <UserPlus color="#ee2a34" />}
    </div>
  );
};
