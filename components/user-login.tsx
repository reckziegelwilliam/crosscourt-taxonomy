"use client";

import { useUser } from "@/context/user-context";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

import UserDropdown from "@/components/user-dropdown";

const UserLogin = () => {
    const { user } = useUser();
    return (
        <nav>
            {user ? (
              <UserDropdown />
            ) : (
              <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "secondary", size: "sm" }),
                "px-4"
              )}
            >
              Login
            </Link>
            )}
        </nav>
    )
}

export {
    UserLogin
}