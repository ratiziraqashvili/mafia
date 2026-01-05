"use client";

import { useModal } from "@/hooks/use-modal-store";
import { Button } from "./ui/button";

export const GameControl = () => {
  const { onOpen } = useModal();

  const onJoinGameModalOpen = () => {
    onOpen("joinGame");
  };

  const onCreateGameModalOpen = () => {
    onOpen("createGame");
  };

  return (
    <div className="mt-5">
      <Button
        onClick={onJoinGameModalOpen}
        size="lg"
        variant="mafia"
      >
        Join Game
      </Button>
      <Button
        onClick={onCreateGameModalOpen}
        size="lg"
        className="w-40 text-md ml-4 bg-[#300e0f]  hover:opacity-80 hover:bg-[#300e0f]"
      >
        Create Game
      </Button>
    </div>
  );
};
