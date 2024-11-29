"use client";
import { Event } from "@/app/page";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { BsPerson, BsTicket } from "react-icons/bs";
import { CgCalendar } from "react-icons/cg";

interface EventListCardProps {
  data: Event;
}

const EventListCard: FC<EventListCardProps> = ({ data }) => {
  return (
    <Link href={`/event/${data.eventId}`}>
      <div className="col-span-1 cursor-pointer group">
        <div className="flex flex-col gap-2 w-full">
          <div className="aspect-square w-full relative overflow-hidden rounded-xl">
            <Image
              fill
              alt="Event"
              src="https://placehold.co/400x400"
              className="object-cover h-full w-full group-hover:scale-110 transition"
            />
          </div>
          <div className="font-bold text-lg">
            {data.title}, {data.city.cityName}
          </div>
          <div className="flex flex-row items-center gap-3 font-light text-neutral-500">
            <CgCalendar size={16} /> {data.startDate}
          </div>
          <div className="flex flex-row items-center gap-3 font-semibold">
            <BsTicket size={16} />
            Rp {data.ticketPrice}
          </div>
          <div className="flex flex-row items-center gap-3 font-normal">
            <BsPerson size={16} />
            {data.availableTicket} / {data.totalTicket}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventListCard;
