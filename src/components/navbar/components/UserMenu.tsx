"use client";

import { FC, useCallback, useEffect, useRef, useState } from "react";
import Avatar from "../../Avatar";
import MenuItem from "./MenuItem";
import { signOut } from "next-auth/react";
import { MenuIcon } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Separator } from "../../ui/separator";
import { customerData, organizerData } from "@/constant/usersData";
import Image from "next/image";

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

  // TODO : these are all still harcoded, need to get from session login
  const userOrganizer = organizerData;
  const userCustomer = customerData;
  const currentUser = userCustomer;
  const isOrganizer = currentUser.role === 2;

  const renderMenuItems = () => {
    if (!currentUser) {
      return (
        <>
          <MenuItem onClick={() => {}} label="Login" />
          <MenuItem onClick={() => {}} label="Register" />
        </>
      );
    }

    return (
      <>
        <div className="flex gap-6 w-full items-center justify-start py-4 px-6">
          <Image
            src="https://placehold.co/50x50"
            alt="User profile image"
            height={50}
            width={50}
            className="rounded-full"
          />
          <div className="flex flex-col gap-2 items-start">
            <p className="text-lg font-bold">{currentUser.name}</p>
            <p className="text-sm">{isOrganizer ? "ORGANIZER" : "CUSTOMER"}</p>
          </div>
        </div>

        <Separator />

        {isOrganizer ? (
          <>
            <MenuItem onClick={() => redirect("/profile")} label="Profile" />
            <MenuItem
              onClick={() => redirect("/events/manage")}
              label="Manage My Events"
            />
            <MenuItem
              onClick={() => redirect("/dashboard")}
              label="Dashboard"
            />
            <MenuItem onClick={() => signOut()} label="Logout" />
          </>
        ) : (
          <>
            <MenuItem
              onClick={() => {
                redirect("/profile");
              }}
              label="Profile"
            />
            <MenuItem
              onClick={() => redirect("/my-tickets")}
              label="My Tickets"
            />
            <Separator />
            <MenuItem onClick={() => signOut()} label="Logout" />
          </>
        )}
      </>
    );
  };

  return (
    <div className="relative" ref={menuRef}>
      <div className="flex flex-row items-center gap-3">
        {isOrganizer && (
          <Link
            href="/events/create"
            className="hidden md:block text-md font-bold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
          >
            Create your event
          </Link>
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
        <div className="absolute rounded-xl shadow-md w-[340px] bg-white overflow-hidden right-0 top-14 font-medium text-md z-20">
          {renderMenuItems()}
        </div>
      )}
    </div>
  );
};

// return (
//   <div className="relative" ref={menuRef}>
//     <div className="flex flex-row items-center gap-3">
//       <Link
//         href={"/events/create"}
//         className="hidden md:block text-md font-bold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
//       >
//         Create your event
//       </Link>
//       <div
//         onClick={toggleOpen}
//         className="p-4 md:py-2 md:px-3 border-[1px] border-neutral-300 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
//       >
//         <MenuIcon className="w-4 h-4" />
//         <div className="hidden md:block">
//           <Avatar />
//         </div>
//       </div>
//     </div>

//     {isOpen && (
//       <div className="absolute rounded-xl shadow-md  w-[340px] bg-white overflow-hidden right-0 top-14 font-medium text-md z-20">
//         {currentUser ? (
//           <>
//             <div className="flex gap-6 w-full items-center justify-start py-4 px-6">
//               <Image
//                 src="https://placehold.co/50x50"
//                 alt="User image"
//                 height={50}
//                 width={50}
//                 className="rounded-full"
//               />
//               <div className="flex flex-col gap-2 items-start">
//                 <p className="text-lg font-bold">{currentUser.name}</p>
//                 <p className="text-sm">
//                   {currentUser.role === 2 ? "ORGANIZER" : "CUSTOMER"}
//                 </p>
//               </div>
//             </div>
//             <Separator />

//           ) : currentUser.role === 2 ? (

//             <MenuItem
//               onClick={() => {
//                 redirect("/profile");
//               }}
//               label="Profile"
//             />

//             {/* How to make this only menu for customer.role === 1 */}
//             <MenuItem
//               onClick={() => {
//                 redirect("/my-tickets");
//               }}
//               label="My Tickets"
//             />
//             <MenuItem
//               onClick={() => {
//                 redirect("/events/manage");
//               }}
//               label="Manage My Events"
//             />
//             <MenuItem
//               onClick={() => {
//                 redirect("/dashboard");
//               }}
//               label="Dashboard"
//             />
//             <Separator />
//             <MenuItem onClick={() => signOut()} label="Logout" />
//           </>
//         ) : (
//           <>
//             <MenuItem onClick={() => {}} label="Login" />
//             <MenuItem onClick={() => {}} label="Register" />
//           </>
//         )}
//       </div>
//     )}
//   </div>
// );
// };

export default UserMenu;
