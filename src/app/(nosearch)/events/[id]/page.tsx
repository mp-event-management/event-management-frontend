"use client";

import React from "react";
import BackButton from "@/components/BackButton";
import CheckoutButton from "@/components/checkout/CheckoutButton";
import PromotionsLists from "@/components/promotions/PromotionsLists";
import { formatDateTime, formatPrice } from "@/lib/utils";
import { CalendarCheck2, MapPinned, Ticket } from "lucide-react";
import Image from "next/image";
import { getEventDetail } from "@/app/api/api";
import { useQuery } from "@tanstack/react-query";
import EmptyState from "@/components/EmptyState";
import { useParams } from "next/navigation";
import SkeletonEventDetails from "@/components/loading/SkeletonEventDetails";

const EventDetailPage = () => {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["event", id],
    queryFn: async () => await getEventDetail(id),
  });

  if (isLoading) {
    return (
      <SkeletonEventDetails />
    );
  }

  if (!data) {
    return (
      <EmptyState
        title="There is no event details"
        subtitle="Please try again later"
        showReset={false}
        height="h-[calc(100vh-280px)]"
      />
    );
  }

  return (
    <section className="w-full sm:w-[90%] md:w-[80%] lg:w-[70%] 2xl:w-[60%] mx-auto lg:mt-4 md:mt-4 sm:mt-2 px-[24px] transition">
      {/* Back button */}
      <BackButton />

      {/* Event hero image */}
      <div className="aspect-square w-full mb-8 h-[280px] md:h-[540px] relative overflow-hidden rounded-xl transition">
        <Image
          height={600}
          width={600}
          // priority
          alt={data.title}
          src={data.eventImagesUrl}
          className="object-cover h-full w-full"
        />
      </div>

      {/* Detail and Purchase */}
      <div className="flex flex-row  justify-between gap-14">
        {/* Details side */}
        <div className="flex flex-col mb-4 lg:mb-32 w-full">
          <div className="text-[18px] font-bold mb-2 flex flex-row gap-2 items-center">
            <p>{formatDateTime(data.startDate).formattedDate}</p>
          </div>
          <h1 className="font-extrabold lg:text-[52px] lg:leading-[62px] md:text-4xl md:leading-[52px] text-3xl whitespace-pre-wrap capitalize">
            {data.title}
          </h1>
          <div className="lg:text-lg text-[16px] text-muted-foreground my-8 whitespace-pre-wrap">
            {data.description}
          </div>

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
            <div className="flex flex-col lg:flex-row  items-start lg:items-center gap-2 text-lg font-normal">
              <p className="text-[16px]">Organized by</p>
              <span className="font-bold text-xl capitalize">
                {data.userOrganizer.name}
              </span>
            </div>
          </div>

          {/* Date and time */}
          <div className="flex flex-col gap-3 mt-16 mb-9">
            <h3 className="text-[24px] font-extrabold">Date and time</h3>
            <div className="flex flex-row gap-4 items-center text-[16px] font-semibold">
              <CalendarCheck2 size={18} />
              <div className="flex items-center gap-2">
                <p>
                  Start date : {formatDateTime(data.startDate).formattedDate}
                </p>
                <p>{formatDateTime(data.startDate).formattedTime}</p>
              </div>
            </div>
            <div className="flex flex-row gap-4 items-center text-[16px] font-semibold">
              <CalendarCheck2 size={18} />
              <div className="flex items-center gap-2">
                <p>End date : {formatDateTime(data.endDate).formattedDate}</p>
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
          <div className="flex flex-col gap-3 mt-9">
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
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-10 bg-white border-t-[1px] w-full flex flex-col items-center gap-4 border-[1px] py-8 px-6 h-[180px] shadow">
          <div className="flex justify-between items-center w-full text-[18px] font-extrabold">
            {data.ticketPrice === 0 ? (
              <p>FREE</p>
            ) : (
              <p>{formatPrice(String(data.ticketPrice))}</p>
            )}
            <p className="flex items-center gap-2 text-[16px] font-bold  bg-blue-50 px-6 py-2 rounded-lg text-slate-700">
              <Ticket />
              {data.availableTicket === 0
                ? "Sold out"
                : `${data.availableTicket} left`}
            </p>
          </div>

          {/* Checkout button */}
          <CheckoutButton event={data} />
        </div>

        {/* Large screen */}
        <div className="hidden lg:flex flex-col items-center justify-between border-[1px] rounded-xl p-6 lg:min-w-[320px] min-h-[160px] max-h-[210px] sticky top-[110px] z-10">
          <div className="flex flex-col items-center gap-2 justify-between text-[24px] font-extrabold w-full">
            {data.ticketPrice === 0 ? (
              <p>FREE</p>
            ) : (
              <p>{formatPrice(String(data.ticketPrice))}</p>
            )}
            <p className="flex items-center gap-2 text-[16px] font-bold bg-blue-50 px-6 py-2 rounded-lg text-slate-700">
              <Ticket />
              {data.availableTicket === 0
                ? "Sold out"
                : `${data.availableTicket} left`}
            </p>
          </div>

          {/* Checkout button */}
          <CheckoutButton event={data} />
        </div>
      </div>
    </section>
  );
};

export default EventDetailPage;
