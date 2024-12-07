import getEventDetail from "@/app/actions/getEventDetails.actions";
import CheckoutButton from "@/components/checkout/CheckoutButton";
import PromotionsLists from "@/components/promotions/PromotionsLists";
import { Button } from "@/components/ui/Button";
import { formatDateTime, formatPrice } from "@/lib/utils";
import { ApiResponse, Event } from "@/types/getEvents";
import { CalendarCheck2, MapPinned, Ticket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { IoArrowBack } from "react-icons/io5";

type EventDetailProps = {
  params: {
    id: string;
  };
};

const EventDetailPage: FC<EventDetailProps> = async ({ params }) => {
  const { id } = await params;

  const { data }: ApiResponse<Event> = await getEventDetail(id);
  console.log(data);

  return (
    <section className="w-full sm:w-[90%] md:w-[80%] lg:w-[70%] 2xl:w-[60%] mx-auto lg:mt-4 md:mt-4 sm:mt-2 px-[24px] transition">
      {/* Arrow back */}
      <div className="flex lg:flex-row flex-col lg:items-center items-start lg:gap-6 gap-4 my-4 lg:mb-6 md:mb-5">
        <Link
          href="/"
          className="lg:hover:bg-neutral-100 lg:rounded-full lg:p-4 rounded-full transition"
        >
          <IoArrowBack size={24} />
        </Link>
      </div>

      {/* Event hero image */}
      <div className="aspect-square w-full mb-10 h-[300px] md:h-[540px] relative overflow-hidden rounded-xl transition">
        <Image
          height={600}
          width={600}
          priority
          alt="Event"
          src="https://placehold.co/600x600"
          className="object-cover h-full w-full"
        />
      </div>

      {/* Detail and Purchase */}
      <div className="flex flex-row  justify-between gap-14">
        {/* Details side */}
        <div className="flex flex-col mb-32 w-full">
          <div className="text-[18px] font-bold mb-2 flex flex-row gap-2 items-center">
            <p>{formatDateTime(data.startDate).formattedDate}</p>
          </div>
          <h1 className="font-extrabold lg:text-[52px] lg:leading-[62px] md:text-4xl md:leading-[52px] text-3xl">
            {data.title}
          </h1>
          <p className="lg:text-lg text-[16px] text-muted-foreground my-8">
            {data.description}
          </p>

          {/* Promotions */}
          <PromotionsLists promotions={data.promotions} />

          {/* Organized by */}
          <div className="flex flex-row items-center gap-4 w-full bg-[#F8F7FA] p-8 rounded-2xl">
            <div className="relative h-14 w-14 rounded-full">
              <Image
                height={600}
                width={600}
                alt="Organizer"
                src="https://placehold.co/40x40"
                className="object-cover h-full w-full rounded-full"
              />
            </div>
            <div className="flex flex-row items-center gap-2 text-lg font-normal">
              <p className="text-[16px]">Organized by</p>
              <span className="font-bold">{data.userOrganizer.name}</span>
            </div>
          </div>

          {/* Date and time */}
          <div className="flex flex-col gap-3 mt-16 mb-9">
            <h3 className="text-[24px] font-extrabold">Date and time</h3>
            <div className="flex flex-row gap-4 items-center text-[16px] font-semibold">
              <CalendarCheck2 size={18} />
              <div className="flex items-center gap-2">
                <p>Start : {formatDateTime(data.startDate).formattedDate}</p>
                <p>{formatDateTime(data.startDate).formattedTime}</p>
              </div>
            </div>
            <div className="flex flex-row gap-4 items-center text-[16px] font-semibold">
              <CalendarCheck2 size={18} />
              <div className="flex items-center gap-2">
                <p>Start : {formatDateTime(data.endDate).formattedDate}</p>
                <p>{formatDateTime(data.endDate).formattedTime}</p>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="flex flex-col gap-3 my-9">
            <h3 className="text-[24px] font-extrabold">Location</h3>
            <p className="flex flex-row gap-4 items-center text-[16px] font-semibold">
              <MapPinned size={18} />
              <span>
                {data.address}, {data.city.cityName}
              </span>
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-col gap-3 my-9">
            <h3 className="text-[24px] font-extrabold">Tags</h3>
            <div className="flex flex-wrap gap-2">
              <span className="text-[16px] py-4 px-6 rounded-full font-bold inline-block w-auto bg-[#F8F7FA]">
                {data.category.name}
              </span>
            </div>
          </div>
        </div>

        {/* Purchase and payment side */}
        {/* Small screen */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-10 bg-white border-t-[1px] w-full flex flex-col items-center gap-4 border-[1px] p-8 h-[160px] shadow">
          <div className="flex justify-between items-center w-full">
            <p className="flex gap-2 items-center text-[24px] font-extrabold text-center">
              Rp{data.ticketPrice}
              <span className="font-normal text-[18px] text-neutral-800">
                per ticket
              </span>
            </p>
            <p className="flex items-center gap-2 text-[16px] font-bold  bg-blue-50 px-6 py-2 rounded-lg text-slate-700">
              <Ticket />
              {data.availableTicket} left
            </p>
          </div>
          <Button color="primary">Get tickets</Button>
        </div>

        {/* Large screen */}
        <div className="hidden lg:flex flex-col items-center justify-between border-[1px] rounded-xl p-6 lg:min-w-[320px] min-h-[160px] max-h-[210px]">
          <div className="flex flex-col items-center gap-2 justify-between text-[24px] font-extrabold w-full">
            {data.ticketPrice === 0 ? (
              <p>FREE</p>
            ) : (
              <p>{formatPrice(String(data.ticketPrice))}</p>
            )}
            <p className="flex items-center gap-2 text-[16px] font-bold  bg-blue-50 px-6 py-2 rounded-lg text-slate-700">
              <Ticket />
              {data.availableTicket} Tickets left
            </p>
          </div>
          <CheckoutButton event={data}/>
          
        </div>
      </div>
    </section>
  );
};

export default EventDetailPage;
