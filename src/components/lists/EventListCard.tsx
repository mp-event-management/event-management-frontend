"use client";
import { formatDateTime } from "@/lib/utils";
import { Event } from "@/types/getEvents";
import { TicketIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface EventListCardProps {
  data: Event;
}

const EventListCard: FC<EventListCardProps> = ({ data }) => {
  return (
    <Link href={`/events/${data.eventId}`}>
      <div className="col-span-1 cursor-pointer group">
        <div className="flex flex-col gap-2 w-full">
          <div className="aspect-square w-full h-[300px] overflow-hidden rounded-xl mb-2">
            <Image
              height={400}
              width={400}
              alt={data.title}
              priority
              src="https://placehold.co/400x400"
              className="object-cover h-full w-full group-hover:scale-110 transition"
            />
          </div>
          <div className="flex flex-row items-center gap-3 font-semibol">
            <span className="flex items-center gap-2 bg-green-100 text-[14px] px-4 py-2 rounded-full font-extrabold text-green-700">
              {data.ticketPrice === 0 ? <p>FREE</p> : <p>IDR {data.ticketPrice}</p>}
            </span>
            <span className="flex items-center gap-2 bg-slate-100 text-[14px] px-4 py-2 rounded-full font-extrabold text-neutral-500">
              {data.category.name}
            </span>
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <p className="font-bold text-lg lg:text-xl line-clamp-2">
              {data.title}, {data.city.cityName}
            </p>
            <p className="font-normal text-gray-500 text-[16px]">
              {formatDateTime(data.startDate).formattedDateTime}
            </p>
            <div className="flex flex-row items-center gap-2 font-bold text-[16px] mt-2">
              <TicketIcon size={18} />
              <p>{data.availableTicket} ticket left</p>
            </div>
            <span className="flex flex-row items-center gap-2 font-bold mt-4 text-rose-500">
              By {data.userOrganizer.name}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventListCard;
