"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth/auth-client";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const SettingsDropdown = () => {
  const router = useRouter();

  const onSignOut = async () => {
    try {
      await authClient.signOut();
      router.refresh();
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="m-5 cursor-pointer">
        <Menu />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 ml-2" align="start">
        <DropdownMenuGroup>
          <Link href="/profile">
            <DropdownMenuItem>Profile</DropdownMenuItem>
          </Link>
          <Link href="/settings">
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuItem onClick={onSignOut}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
