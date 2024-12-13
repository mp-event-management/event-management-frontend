"use client";

import React from "react";
import { Skeleton } from "../ui/skeleton";

const SkeletonEventDetails = () => {
  return (
    <section className="w-full sm:w-[90%] md:w-[80%] lg:w-[70%] 2xl:w-[60%] mx-auto lg:mt-4 md:mt-4 sm:mt-2 px-[24px] transition">
      <Skeleton className="h-9 w-9 lg:h-14 lg:w-14 rounded-full mb-2 lg:mb-4" />

      {/* Event hero image */}
      <Skeleton className="rounded-xl mb-8 h-[280px] md:h-[540px]" />

      {/* Detail and Purchase */}
      <div className="flex flex-row justify-between gap-14">
        {/* Details side */}
        <div className="flex flex-col mb-4 lg:mb-32 w-full">
          <div className="text-[18px] font-bold mb-2 flex flex-row gap-2 items-center">
            <Skeleton className="h-5 w-[220px] rounded-full mb-2" />
          </div>
          <div className="flex flex-col gap-4">
            <Skeleton className="h-12 w-full rounded-full" />
            <Skeleton className="h-12 w-[80%] rounded-full" />
          </div>

          <div className="flex flex-col mt-10 gap-6 mb-10">
            <Skeleton className="h-36 w-full rounded-lg" />
            <Skeleton className="h-36 w-[80%] rounded-lg" />
          </div>

          {/* Promotions */}
          <Skeleton className="h-36 w-full rounded-lg" />

          {/* Organized by */}
          <Skeleton className="h-32 w-full rounded-lg mt-10" />

          {/* Date and time */}
          <div className="flex flex-col gap-3 mt-16 mb-9">
            <Skeleton className="h-8 w-[200px] rounded-full" />
            <div className="flex flex-row gap-4 items-center text-[16px] font-semibold">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-[220px] lg:w-[250px]" />
                <Skeleton className="h-4 w-[200px] lg:w-[250px]" />
              </div>
            </div>
            <div className="flex flex-row gap-4 items-center text-[16px] font-semibold">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-[210px] lg:w-[280px]" />
                <Skeleton className="h-5 w-[180px] lg:w-[250px]" />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="flex flex-col gap-3 my-9">
            <Skeleton className="h-8 w-[160px] rounded-full" />
            <Skeleton className="h-5 w-[340px] rounded-full" />
          </div>

          {/* Tags */}
          <div className="flex flex-col gap-3 mt-9">
            <Skeleton className="h-8 w-[80px] rounded-full" />
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-10 w-[150px] rounded-full" />
            </div>
          </div>
        </div>

        {/* Purchase and payment side */}
        {/* Small screen */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-10 bg-white border-t-[1px] w-full flex flex-col items-center gap-4 border-[1px] py-8 px-6 h-[180px] shadow">
          <div className="flex justify-between items-center w-full text-[18px] font-extrabold mt-2">
            <Skeleton className="h-6 w-[160px] rounded-lg" />
            <Skeleton className="h-10 w-[180px] rounded-lg mb-1" />
          </div>

          {/* Checkout button */}
          <Skeleton className="h-12 w-full rounded-sm" />
        </div>

        {/* Large screen */}
        <div className="hidden lg:flex flex-col items-center justify-between border-[1px] rounded-xl p-6 lg:min-w-[320px] min-h-[160px] max-h-[210px] sticky top-[110px] z-10">
          <div className="flex flex-col items-center gap-2 justify-between text-[24px] font-extrabold w-full">
            <Skeleton className="h-6 w-[140px] rounded-full" />
            <Skeleton className="mt-2 h-10 w-[180px] rounded-lg" />
          </div>

          {/* Checkout button */}
          <Skeleton className="h-12 w-full rounded-sm" />
        </div>
      </div>
    </section>
  );
};

export default SkeletonEventDetails;
