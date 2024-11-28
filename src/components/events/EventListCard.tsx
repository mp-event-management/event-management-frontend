"use client";
import { Event } from "@/app/page";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { BsPerson } from "react-icons/bs";

interface EventListCardProps {
  data: Event;
}

const EventListCard: FC<EventListCardProps> = ({ data }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`event/${data.title}`)}
      className="col-span-1 cursor-pointer group"
    >
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
        <div className="font-light text-neutral-500">{data.startDate}</div>
        <div className="font-semibold">Rp {data.ticketPrice}</div>
        <div className="flex flex-row items-center gap-1">
          <BsPerson size={18} />
          <div className="font-normal">
            {data.availableTicket} / {data.totalTicket}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventListCard;
