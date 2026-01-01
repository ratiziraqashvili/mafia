"use client";

import { useModal } from "@/hooks/use-modal-store";
import {
  Dialog,
  DialogClose,
  DialogContent,
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

const formSchema = z.object({
  sessionName: z
    .string()
    .min(1, "Session name is required")
    .max(30, "Session name must be at most 30 characters long"),
  mode: z.enum(["serial-killer", "yakuza"]),
  visibility: z.enum(["public", "private"]),
});

export const CreateGameModal = () => {
  const { isOpen, type, onClose } = useModal();

  const createGame = async (values: z.infer<typeof formSchema>) => {
    return await api.post("/create/game", values).then((res) => res.data);
  };

  const { mutate, isPending, isError } = useMutation({
    mutationFn: createGame,
    onSuccess: () => {
      onClose();
      form.reset();
    },
    onError: () => {
      console.log("Error creating game");
    },
  });

  const handleClose = () => {
    onClose();
    form.reset();
  };

  const isModalOpen = isOpen && type === "createGame";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sessionName: "",
      mode: "serial-killer",
      visibility: "public",
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
                        <SelectValue placeholder="Select a mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="serial-killer">
                          Serial Killer
                        </SelectItem>
                        <SelectItem value="yakuza">Yakuza</SelectItem>
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
                        <SelectValue placeholder="Select a visibility" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isError && (
              <p className="text-sm text-red-500 text-center">
                Failed to create game
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
