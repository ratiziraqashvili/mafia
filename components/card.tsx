import { Sticker } from "./sticker"

type StickerType = "Skull" | "Eye" | "UserPlus";

interface CardProps {
  heading: string;
  paragraph: string;
  stickerType: StickerType;
}

export const Card = ({ heading, paragraph, stickerType }: CardProps) => {
  return (
    <div className="rounded-lg bg-[#1a1417] flex flex-col items-center p-5 border border-gray-800 gap-3">
      <Sticker stickerType={stickerType} />
      <h3>{heading}</h3>
      <span className="text-sm text-muted-foreground max-w-md text-center">
        {paragraph}
      </span>
    </div>
  );
};
