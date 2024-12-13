import { Event } from "@/types/getEvents";
import React, { FC, useState } from "react";
import { Button } from "../ui/Button";
import Link from "next/link";
import TransactionModal from "../modal/TransactionModal";
import { useSession } from "next-auth/react";

type CheckoutButtonProps = {
  event: Event;
};

const CheckoutButton: FC<CheckoutButtonProps> = ({ event }) => {
  const { data: session } = useSession();

  const hasEventFinished = new Date(event.endDate) < new Date();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (hasEventFinished) {
    return (
      <p className="px-4 text-center text-rose-500 w-full font-bold text-[16px]">
        Sorry, this event is no longer available.
      </p>
    );
  }

  if (session?.user.roles.includes("ROLE_ORGANIZER")) {
    return (
      <p className="px-4 text-center text-rose-500 w-full font-bold text-[16px]">
        Organizers cannot buy the ticket
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
      {session?.user.roles.includes("ROLE_CUSTOMER") ? (
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
