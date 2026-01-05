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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api/client";
import { GameMode, GameVisibility } from "@/generated/prisma/enums";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  sessionName: z
    .string()
    .min(1, "Session name is required")
    .max(30, "Session name must be at most 30 characters long"),
  mode: z.enum(GameMode),
  visibility: z.enum(GameVisibility),
});

export const CreateGameModal = () => {
  const { isOpen, type, onClose } = useModal();
  const router = useRouter();

  const createGame = async (values: z.infer<typeof formSchema>) => {
    return await api.post("/game/create", values).then((res) => res.data);
  };

  const handleClose = () => {
    onClose();
    form.reset();
  };

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createGame,
    onSuccess: (data) => {
      handleClose();
      router.push(`/game/${data.gameId}`);
    },
    onError: (e) => {
      console.error("Error creating game", e);
    },
  });

  const isModalOpen = isOpen && type === "createGame";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sessionName: "",
      mode: GameMode.SERIAL_KILLER,
      visibility: GameVisibility.PUBLIC,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <DialogHeader>
              <DialogTitle>Create Game</DialogTitle>
              <DialogDescription>
                Create a new game to start playing
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="sessionName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Session name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="Session name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mode</FormLabel>
                  <FormControl>
                    <Select
                      disabled={isPending}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Serial Killer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={GameMode.SERIAL_KILLER}>
                          Serial Killer
                        </SelectItem>
                        <SelectItem value={GameMode.YAKUZA}>Yakuza</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="visibility"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Visibility</FormLabel>
                  <FormControl>
                    <Select
                      disabled={isPending}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Public" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={GameVisibility.PUBLIC}>
                          Public
                        </SelectItem>
                        <SelectItem value={GameVisibility.PRIVATE}>
                          Private
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isError && (
              <p className="text-sm text-red-500 text-center">
                {error.message}
              </p>
            )}
            <div className="flex justify-center gap-2">
              <DialogClose asChild>
                <Button disabled={isPending}>Cancel</Button>
              </DialogClose>
              <Button disabled={isPending} type="submit">
                Create
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
