import { useModal } from "@/hooks/use-modal-store";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";

export const JoinGameModal = () => {
  const [gameCode, setGameCode] = useState("");
  const { isOpen, type, onClose } = useModal();

  const handleClose = () => {
    onClose();
    setGameCode("");
  };

  const isModalOpen = isOpen && type === "joinGame";

  const onGameCode = () => {
    //Join game logic
    console.log(gameCode);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-black flex flex-col">
        <DialogHeader>
          <DialogTitle>Join Game</DialogTitle>
          <DialogDescription>Enter the game code to join</DialogDescription>
        </DialogHeader>
        <Input onChange={(e) => setGameCode(e.target.value)} />
        <div className="flex justify-center gap-2">
          <DialogClose asChild>
            <Button>Cancel</Button>
          </DialogClose>
          <DialogClose>
            <Button onClick={onGameCode}>Join</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
