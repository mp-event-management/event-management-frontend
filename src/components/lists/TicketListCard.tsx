import { UserCustomer } from "@/types/getEvents";
import Link from "next/link";
import React, { FC } from "react";
import { Button } from "../ui/Button";
import Image from "next/image";
import { Ticket } from "@/types/tickets";
import { formatDateTime } from "@/lib/utils";

interface TicketListCardProps {
  data: Ticket;
  customer: UserCustomer;
}

const TicketListCard: FC<TicketListCardProps> = ({ data, customer }) => {
  return (
    <div className="col-span-1">
      <Link href={`/my-tickets/${data.id}`}>
        <div className="flex flex-col gap-2 lg:flex-row lg:gap-8 w-full cursor-pointer group">
          <div className="aspect-square w-full lg:w-[400px] h-[200px] overflow-hidden rounded-xl mb-2 relative">
            <Image
              height={400}
              width={400}
              alt={data.eventName}
              priority
              src="https://placehold.co/400x400"
              className="object-cover h-full w-full group-hover:scale-110 transition"
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-bold text-lg lg:text-xl line-clamp-1">
              {data.eventName}
            </p>
            <p className="font-normal text-gray-500 text-[16px]">
              {formatDateTime(data.eventStartDate).formattedDateTime}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TicketListCard;
