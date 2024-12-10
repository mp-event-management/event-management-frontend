import { UserCustomer } from "@/types/getEvents";
import Link from "next/link";
import React, { FC } from "react";
import { Button } from "../ui/Button";
import Image from "next/image";
import { Ticket } from "@/types/tickets";
import { formatDateTime } from "@/lib/utils";
import { Move, Navigation, Navigation2Icon, Pen } from "lucide-react";
import { BiNavigation } from "react-icons/bi";
import { LuNavigation } from "react-icons/lu";
import { Separator } from "../ui/separator";
import { TbInvoice, TbRating12Plus } from "react-icons/tb";

interface TicketListCardProps {
  data: Ticket;
  customer: UserCustomer;
}

const TicketListCard: FC<TicketListCardProps> = ({ data, customer }) => {
  return (
    <div className="col-span-1">
      {/* <Link href={`/my-tickets/${data.id}`}> */}
      <div className="flex flex-col justify-start gap-2 lg:flex-row lg:gap-8 w-full group">
        <div className="aspect-square w-full lg:w-[500px] h-[200px] overflow-hidden rounded-xl mb-2 relative">
          <Image
            height={400}
            width={400}
            alt={data.eventName}
            priority
            src="https://placehold.co/400x400"
            className="object-cover h-full w-full group-hover:scale-110 hover:cursor-pointer transition"
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
            <div className="flex lg:flex-col justify-between items-center lg:items-start gap-2 mb-8">
              <p className="font-normal text-[16px] line-clamp-1 mt-2">
                Customer : {data.customerName}
              </p>
              <p className="font-bold text-green-600 text-[16px]">
                Status : {data.status}
              </p>
            </div>
          </div>
          <div className="flex gap-4 w-full justify-between lg:justify-start overflow-auto">
            <Button variant="link" asChild>
              <Link href={`/events/${data.eventId}`}>
                See event details
                <LuNavigation />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={`/my-tickets/${data.id}`}>
                See invoice
                <TbInvoice/>
              </Link>
            </Button>
            <Button variant="outline">
              Give your Review
              <Pen />
            </Button>
          </div>
        </div>
      </div>
      {/* </Link> */}
      <Separator className="mt-8" />
    </div>
  );
};

export default TicketListCard;
