import { Event } from "@/types/getEvents";
import React, { FC } from "react";
import { Button } from "../ui/Button";
import Link from "next/link";

type CheckoutButtonProps = {
  event: Event;
};

const CheckoutButton: FC<CheckoutButtonProps> = ({ event }) => {
  // TODO: this still harcoded, need to get from session login
  const userCustomer = {
    id: 2,
    role: 1,
    name: "Naruto",
    email: "naruto@example.com",
    password: "narutohash",
    referralCode: "REF1",
    isFirstTimeDiscount: false,
  };

  const hasEventFinished = new Date(event.endDate) < new Date();
  const registerDiscount = userCustomer.isFirstTimeDiscount;

  return (
    <div className="flex items-center gap-3 w-full">
      {/* Cannot buy past event */}
      {hasEventFinished ? (
        <p className="px-4 text-center text-rose-500 w-full font-bold text-[16px]">
          Sorry, this event is no longer avaliable.
        </p>
      ) : userCustomer.role === 1 ? (
        <Button>
          {event.ticketPrice === 0 ? "Get Ticket" : "Buy Ticket"}
        </Button>
      ) : (
        <Button asChild>
          <Link href="login">Login</Link>
        </Button>
      )}
    </div>
  );
};

export default CheckoutButton;
