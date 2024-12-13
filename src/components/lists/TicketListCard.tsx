"use client";

import Link from "next/link";
import React, { FC, useState } from "react";
import { Button } from "../ui/Button";
import Image from "next/image";
import { Ticket } from "@/types/tickets";
import { formatDateTime, formatPrice } from "@/lib/utils";
import { Pen } from "lucide-react";
import { LuNavigation } from "react-icons/lu";
import { Separator } from "../ui/separator";
import { TbInvoice } from "react-icons/tb";
import RatingModal from "../modal/RatingModal";

interface TicketListCardProps {
  data: Ticket;
  customer: number | undefined;
}

const TicketListCard: FC<TicketListCardProps> = ({ data, customer }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  // const customerData = customer;

  return (
    <div className="col-span-1">
      <div className="flex flex-col justify-start gap-2 lg:flex-row lg:gap-8 w-full">
        <div className="aspect-square w-full lg:max-w-[460px] h-[200px] overflow-hidden rounded-xl mb-2 relative">
          <Image
            height={400}
            width={400}
            alt={data.eventName}
            priority
            src={data.eventImagesUrl}
            className="object-cover h-full w-full hover:scale-110 hover:cursor-pointer transition"
          />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <div className="flex flex-col lg:flex-row w-full gap-1 lg:gap-8 lg:items-center">
              <p className="font-bold text-[20px] lg:text-2xl line-clamp-1">
                {data.eventName}
              </p>
              <p className="font-normal text-gray-500 text-[16px]">
                {formatDateTime(data.eventStartDate).formattedDateTime}
              </p>
              <p className="font-normal text-gray-500 text-[16px]">
                Ticket Number : {data.id}
              </p>
            </div>
            <div className="flex lg:flex-col justify-between items-center lg:items-start gap-2 ">
              <p className="font-normal text-[16px] line-clamp-1 mt-2">
                Customer : {data.customerName}
              </p>
              <p className="font-bold text-green-600 text-[16px]">
                Status : {data.status}
              </p>
            </div>
            <div className="flex items-center justify-between lg:justify-normal gap-10 mt-2 mb-8 lg:mb-0">
              <p className="font-bold text-[16px] text-rose-500">
                {formatPrice(String(data.price))}
              </p>
              <p className="font-normal text-gray-500 text-[16px]">
                Issue at : {formatDateTime(data.issuedate).formattedDateTime}
              </p>
            </div>
          </div>

          <RatingModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            eventId={data.eventId}
            // customerId={customer}
          />

          <div className="flex gap-4 w-full justify-between lg:justify-start overflow-auto">
            <Button variant="link" asChild>
              <Link href={`/events/${data.eventId}`}>
                See event details
                <LuNavigation />
              </Link>
            </Button>

            <Button variant="outline" asChild>
              <Link href={`/ticket/invoice/${data.transactionId}`} target="_blank">
                See invoice
                <TbInvoice />
              </Link>
            </Button>

            <Button
              variant="notFull"
              disabled={
                new Date() <
                new Date(
                  data.eventEndDate || new Date() > new Date(data.eventEndDate)
                )
              }
              onClick={handleOpenModal}
            >
              Give your review
              <Pen />
            </Button>
          </div>
        </div>
      </div>
      <Separator className="mt-8" />
    </div>
  );
};

export default TicketListCard;
