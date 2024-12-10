"use client";

import { useParams } from "next/navigation";
import React from "react";

const TicketDetailsPage = () => {
  const { id } = useParams();
  console.log("Ticket id: ", id);
  return <div>TicketDetailsPage</div>;
};

export default TicketDetailsPage;
