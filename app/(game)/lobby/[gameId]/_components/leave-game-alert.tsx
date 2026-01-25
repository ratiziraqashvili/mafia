import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api/client";
import { useMutation } from "@tanstack/react-query";
import { LogOut } from "lucide-react";

interface LeaveGameAlertProps {
  gameId: string;
}

export const LeaveGameAlert = ({ gameId }: LeaveGameAlertProps) => {
  const onLeave = async () => {
    return await api.delete("/")
  };

  const { isPending, isError, error, data } = useMutation({
    mutationFn: onLeave,
    onSuccess: (data) => {

    },
    onError: (e) => {

    }
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="secondary">
          <LogOut />
          <span>Leave Lobby</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Note that you can rejoin the game only if player count is less than
            12.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="">
          <AlertDialogCancel className="bg-black hover:bg-black/80">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction className="">Leave</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
