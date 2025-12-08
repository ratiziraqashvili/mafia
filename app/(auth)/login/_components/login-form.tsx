"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const formSchema = z.object({
  email: z.string().min(1, {
    message: "Please enter your email!",
  }),
  password: z.string().min(1, {
    message: "Please enter your password!",
  }),
  rememberMe: z.boolean(),
});

export const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onLogin = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
        rememberMe: values.rememberMe,
      },
      {
        onSuccess: () => {
          router.push("/");
          console.log("You are in")
        },
        onError: (ctx) => {
          toast.error("Invalid email or password");
        },
        onResponse: () => {
          setIsLoading(false);
        },
      }
    );

    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onLogin)}
        className="bg-[#171717] rounded-2xl p-7 border border-muted-foreground sm:w-[70%] sm:max-w-md w-[80%] flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#dde]">Email</FormLabel>
              <FormControl>
                <Input placeholder="your@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#dde]">Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rememberMe"
          render={({ field }) => (
            <FormItem className="flex items-center">
              <FormControl>
                <Checkbox
                  className="pb-3"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <Label className="text-[#dde]">Remember Me</Label>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="mt-4 bg-(--red) hover:bg-red-700 p-6 text-lg hover:cursor-pointer"
          disabled={isLoading}
        >
          Login
        </Button>
        <div className="flex items-center justify-center gap-1">
          <span className="text-sm text-muted-foreground font-medium">
            Don't have an account?
          </span>
          <Link
            href="/register"
            className="text-(--red) hover:text-red-300 transition font-medium"
          >
            Create an account
          </Link>
        </div>
      </form>
    </Form>
  );
};
