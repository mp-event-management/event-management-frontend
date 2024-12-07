"use client";
import { Event } from "@/types/getEvents";
import { TicketIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { CgCalendar } from "react-icons/cg";

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
            <span className="flex items-center gap-2 bg-yellow-100 text-[14px] px-4 py-2 rounded-full font-extrabold text-yellow-700">
              {data.ticketPrice === 0 ? (
                <span>FREE</span>
              ) : (
                <span>Rp {data.ticketPrice}</span>
              )}
            </span>
            <span className="flex items-center gap-2 bg-slate-100 text-[14px] px-4 py-2 rounded-full font-extrabold text-neutral-500">
              {data.category.name}
            </span>
          </div>
          <div className="flex items-center gap-4 mt-2">
            <span className="font-bold text-[18px]">
              {data.title}, {data.city.cityName}
            </span>
          </div>
          <div className="flex flex-row items-center gap-2 font-normal text-neutral-500 text-[16px]">
            <CgCalendar size={16} /> {data.startDate}
          </div>
          <div className="flex flex-row items-center gap-2 font-semibold text-[16px]">
            <TicketIcon size={16} />
            {data.availableTicket} ticket left
          </div>
          <span className="flex flex-row items-center gap-2 font-bold mt-4 text-rose-500">
            By {data.userOrganizer.name}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default EventListCard;
