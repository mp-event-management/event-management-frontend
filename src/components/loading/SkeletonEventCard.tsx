import React, { FC } from "react";
import { Skeleton } from "../ui/skeleton";

const SkeletonEventCard: FC = () => {
  return (
    <div className="col-span-1">
      <div className="flex flex-col gap-2 w-full cursor-pointer group">
        <Skeleton className="aspect-square w-full h-[300px] overflow-hidden rounded-xl mb-2 relative" />
        <div className="flex flex-row items-center gap-3 font-semibol">
          <Skeleton className="h-8 w-[80px] rounded-full" />
          <Skeleton className="h-8 w-[80px] rounded-full" />
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <Skeleton className="h-6 w-full rounded-full" />
          <Skeleton className="h-5 w-[160px] pt-2 rounded-full" />

          <div className="flex flex-col items-start gap-6 font-bold text-[14px] lg:text-[16px] mt-4">
            <Skeleton className="h-4 w-[140px] rounded-full" />
            <Skeleton className="h-4 w-[100px] rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonEventCard;
