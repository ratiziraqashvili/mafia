import { useModal } from "@/hooks/use-modal-store";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api/client";
import { AxiosError } from "axios";

export const JoinGameModal = () => {
  const [gameCode, setGameCode] = useState("");
  const { isOpen, type, onClose } = useModal();
  const router = useRouter();

  const joinGame = async () => {
    return await api
      .post("/game/join", {
        gameCode,
      })
      .then((res) => res.data);
  };

  const handleClose = () => {
    onClose();
    setGameCode("");
  };

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: joinGame,
    onSuccess: (data) => {
      handleClose();
      router.push(`/lobby/${data.gameId}`);
    },
    onError: (e) => {
      console.error("Error joining game", e);
    },
  });

  const isModalOpen = isOpen && type === "joinGame";

  const axiosError = error as AxiosError<{ message: string }>;

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="flex flex-col">
        <DialogHeader>
          <DialogTitle>Join Game</DialogTitle>
          <DialogDescription>Enter the game code to join</DialogDescription>
        </DialogHeader>
        <Input
          disabled={isPending}
          onChange={(e) => setGameCode(e.target.value)}
          value={gameCode}
          placeholder="Enter a code"
        />
        <div className="flex justify-center gap-2">
          <DialogClose asChild>
            <Button disabled={isPending}>Cancel</Button>
          </DialogClose>
          <Button disabled={isPending || !gameCode} onClick={() => mutate()}>
            Join
          </Button>
        </div>
        {isError && (
          <p className="text-sm text-red-500 text-center">
            {axiosError.response?.data?.message}
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
};
