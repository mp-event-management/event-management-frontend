"use client";

import React, { FC } from "react";
import { Button } from "../ui/Button";
import { Event } from "@/types/getEvents";

type CheckoutProps = {
  event: Event;
  customerId: number;
};

const Checkout: FC<CheckoutProps> = ({ event, customerId }) => {
  const onCheckout = async () => {
    console.log("CHECKOUT");
  };

  return (
    <form action={onCheckout} method="POST" className="w-full">
      <Button type="submit" role="link">
        {event.ticketPrice === 0 ? "Get Ticket" : "Buy Ticket"}
      </Button>
    </form>
  );
};

export default Checkout;
