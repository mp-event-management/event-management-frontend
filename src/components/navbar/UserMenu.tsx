"use client";

import { FC, useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import { signOut } from "next-auth/react";

const UserMenu: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const currentUser = false;

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => {}}
          className="hidden md:block text-md font-bold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Create your event
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-2 md:px-3 border-[1px] border-neutral-300 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-14 font-medium text-md">
          {currentUser ? (
            <>
              <MenuItem onClick={() => {}} label="Profile" />
              <MenuItem onClick={() => {}} label="My Events" />
              <hr />
              <MenuItem onClick={() => signOut()} label="Logout" />
            </>
          ) : (
            <>
              <MenuItem onClick={() => {}} label="Login" />
              <MenuItem onClick={() => {}} label="Sign Up" />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
