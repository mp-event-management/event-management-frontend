import { Event } from "@/types/getEvents";
import React, { FC } from "react";
import { Button } from "../ui/Button";

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
    <div className="flex items-center gap-3">
      {/* Cannot buy past event */}
      {hasEventFinished ? (
        <p className="px-4 text-center w-full font-medium text-[16px]">
          Sorry, tickets are no longer avaliable.
        </p>
      ) : (
        <>
          <Button>Get tickets</Button>
        </>
      )}
    </div>
  );
};

export default CheckoutButton;
