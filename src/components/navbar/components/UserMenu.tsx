"use client";

import { FC, useCallback, useEffect, useRef, useState } from "react";
import Avatar from "../../Avatar";
import MenuItem from "./MenuItem";
import { signOut, useSession } from "next-auth/react";
import { MenuIcon } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Separator } from "../../ui/separator";
import Image from "next/image";

const UserMenu: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { data: session } = useSession();

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const handleClose = useCallback((event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClose);
    return () => {
      document.removeEventListener("mousedown", handleClose);
    };
  }, [handleClose]);

  const handleMenuClick = (action: () => void) => {
    return () => {
      setIsOpen(false);
      action();
    };
  };

  const renderMenuItems = () => {
    if (!session) {
      return (
        <>
          <MenuItem
            onClick={handleMenuClick(() => redirect("/login"))}
            label="Login"
          />
          <Separator />
          <MenuItem
            onClick={handleMenuClick(() => redirect("/register"))}
            label="Register"
          />
        </>
      );
    }

    return (
      <>
        <div className="flex gap-6 w-full items-center justify-center py-4 px-6">
          <div className="flex flex-col justify-center gap-2 items-center">
            <Image
              src="https://placehold.co/60x60"
              alt="User profile image"
              height={50}
              width={50}
              className="rounded-full"
            />
            <p className="text-xl text-center w-full font-extrabold capitalize pt-2">
              Hi, {session?.user.name}
            </p>
            <p className="text-sm">
              {session?.user.roles.includes("ROLE_ORGANIZER")
                ? "ORGANIZER"
                : "CUSTOMER"}
            </p>
          </div>
        </div>

        <Separator />

        {session && session?.user.roles.includes("ROLE_ORGANIZER") ? (
          <>
            <MenuItem
              onClick={handleMenuClick(() => redirect("/profile"))}
              label="Profile"
            />
            <MenuItem
              onClick={handleMenuClick(() => redirect("/events/manage"))}
              label="Manage My Events"
            />
            <MenuItem
              onClick={handleMenuClick(() => redirect("/dashboard"))}
              label="Dashboard"
            />

            <Separator />
            <MenuItem onClick={() => signOut()} label="Logout" />
          </>
        ) : (
          <>
            <MenuItem
              onClick={handleMenuClick(() => {
                redirect("/profile");
              })}
              label="Profile"
            />
            <MenuItem
              onClick={handleMenuClick(() => redirect("/my-tickets"))}
              label="My Tickets"
            />
            <Separator />
            <MenuItem
              onClick={handleMenuClick(() => signOut())}
              label="Logout"
            />
          </>
        )}
      </>
    );
  };

  return (
    <div className="relative" ref={menuRef}>
      <div className="flex flex-row items-center gap-3">
        {session?.user.roles.includes("ROLE_ORGANIZER") ? (
          <Link
            href="/events/create"
            className="hidden md:block text-md font-bold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
          >
            Create your event
          </Link>
        ) : (
          !session?.user.roles.includes("ROLE_ORGANIZER") &&
          !session?.user.roles.includes("ROLE_CUSTOMER") && (
            <Link
              href="/login"
              className="hidden md:block text-md font-bold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
            >
              Login account
            </Link>
          )
        )}
        <div
          onClick={toggleOpen}
          className="p-4 md:py-2 md:px-3 border-[1px] border-neutral-300 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <MenuIcon className="w-4 h-4" />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[320px] bg-white overflow-hidden right-0 top-14 font-medium text-md z-20">
          {renderMenuItems()}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
