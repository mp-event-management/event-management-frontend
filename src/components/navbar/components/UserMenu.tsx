"use client";

import { FC, useCallback, useEffect, useRef, useState } from "react";
import Avatar from "../../Avatar";
import MenuItem from "./MenuItem";
import { signOut } from "next-auth/react";
import { MenuIcon } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Separator } from "../../ui/separator";

const UserMenu: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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

  const userOrganizer = {
    id: 1,
    role: 2,
    name: "John Doe",
    email: "johndoe@example.com",
    password: "johndoehash",
  };

  const userCustomer = {
    id: 2,
    role: 1,
    name: "Naruto",
    email: "naruto@example.com",
    password: "narutohash",
    referralCode: "REF1",
  };

  const currentUser = userOrganizer;

  return (
    <div className="relative" ref={menuRef}>
      <div className="flex flex-row items-center gap-3">
        <Link
          href={"/events/create"}
          className="hidden md:block text-md font-bold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Create your event
        </Link>
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
        <div className="absolute rounded-xl shadow-md w-[14vw] bg-white overflow-hidden right-0 top-14 font-medium text-md z-[11]">
          {currentUser ? (
            <>
              <div className="flex flex-col gap-2 w-full items-center justify-center py-4">
                <p className="text-lg font-bold">{currentUser.name}</p>
                <p className="text-sm">
                  {currentUser.role === 2 ? "ORGANIZER" : "CUSTOMER"}
                </p>
              </div>
              <Separator />
              <MenuItem
                onClick={() => {
                  redirect("/profile");
                }}
                label="Profile"
              />
              <MenuItem
                onClick={() => {
                  redirect("/my-events");
                }}
                label="My Tickets"
              />
              <MenuItem
                onClick={() => {
                  redirect("/events/manage");
                }}
                label="Manage My Events"
              />
              <Separator />
              <MenuItem onClick={() => signOut()} label="Logout" />
            </>
          ) : (
            <>
              <MenuItem onClick={() => {}} label="Login" />
              <MenuItem onClick={() => {}} label="Register" />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
