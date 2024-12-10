import { Event } from "@/types/getEvents";
import React, { FC, useState } from "react";
import { Button } from "../ui/Button";
import Link from "next/link";
import { customerData, organizerData } from "@/constant/usersData";
import TransactionModal from "../modal/TransactionModal";

type CheckoutButtonProps = {
  event: Event;
};

const CheckoutButton: FC<CheckoutButtonProps> = ({ event }) => {
  // TODO: this still harcoded, need to get from session login
  const userCustomer = customerData;

  const hasEventFinished = new Date(event.endDate) < new Date();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        Organizers cannot buy tickets
      </p>
    );
  }

  return (
    <div className="w-full">
      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        event={event}
      />
      {userCustomer.role === 1 ? (
        <Button onClick={() => setIsModalOpen(true)}>
          {event.ticketPrice === 0 ? "Get Ticket" : "Buy Ticket"}
        </Button>
      ) : (
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
      )}
    </div>
  );
};

export default CheckoutButton;
