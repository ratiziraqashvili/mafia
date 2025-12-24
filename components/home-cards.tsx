import { Card } from "./card";

export const HomeCards = () => {
  return (
    <div className="grid grid-rows-3 lg:grid-cols-3 gap-5">
      <Card
        heading="Secret Roles"
        paragraph="Play as Mafia, Villager, Doctor, or Detective. Each role has unique abilities."
        stickerType="Skull"
      />
      <Card
        heading="Strategic Voting"
        paragraph="Discuss, deceive, and vote to eliminate suspects. Trust no one."
        stickerType="Eye"
      />
      <Card
        heading="Multiplayer Lobbies"
        paragraph="Join friends or meet new players in real-time game lobbies."
        stickerType="UserPlus"
      />
    </div>
  );
};
