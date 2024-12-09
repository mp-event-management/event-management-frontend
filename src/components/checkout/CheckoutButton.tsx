import { Event } from "@/types/getEvents";
import React, { FC } from "react";
import { Button } from "../ui/Button";
import Link from "next/link";
import { customerData } from "@/constant/usersData";

type CheckoutButtonProps = {
  event: Event;
};

const CheckoutButton: FC<CheckoutButtonProps> = ({ event }) => {
  // TODO: this still harcoded, need to get from session login
  const userCustomer = customerData;

  const hasEventFinished = new Date(event.endDate) < new Date();

  if (hasEventFinished) {
    return (
      <p className="px-4 text-center text-rose-500 w-full font-bold text-[16px]">
        Sorry, this event is no longer available.
      </p>
    );
  }

  if (userCustomer.role === 2) {
    return (
      <p className="px-4 text-center text-rose-500 w-full font-bold text-[16px]">
        Sorry, organizers cannot buy tickets.
      </p>
    );
  }

  if (userCustomer.role === 1) {
    return (
      <Button>
        {event.ticketPrice === 0 ? "Get Ticket" : "Buy Ticket"}
      </Button>
    );
  }

  return (
    <Button asChild>
      <Link href="/login">Login</Link>
    </Button>
  );
};

export default CheckoutButton;
