import React, { FC } from "react";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

const SkeletonMyTicketLists: FC = () => {
  return (
    <div className="col-span-1">
      <div className="flex flex-col justify-start gap-2 lg:flex-row lg:gap-8 w-full">
        <Skeleton className="h-[200px] lg:max-w-[480px] w-full rounded-lg" />
        <div className="flex flex-col justify-between">
          <div>
            <div className="flex flex-col lg:flex-row w-full gap-1 lg:gap-8 lg:items-center">
              <Skeleton className="h-5 lg:h-8 lg:w-[540px] rounded-full" />
              <Skeleton className="h-4 w-[170px] rounded-full" />
              <Skeleton className="h-4 w-[160px] rounded-full" />
            </div>
            <div className="flex lg:flex-col justify-between items-center lg:items-start gap-2 mt-4">
              <Skeleton className="h-4 w-[140px] rounded-full" />
              <Skeleton className="h-4 w-[110px] rounded-full" />
            </div>
            <div className="flex items-center justify-between lg:justify-normal gap-10 mt-3 mb-8 lg:mb-0">
              <Skeleton className="h-4 w-[80px] rounded-full" />
              <Skeleton className="h-4 w-[110px] rounded-full" />
            </div>
          </div>

          <div className="flex gap-4 w-full justify-between lg:justify-start overflow-auto">
            <Skeleton className="h-[52px] w-[180px] rounded-lg" />
            <Skeleton className="h-[52px] w-[170px] rounded-lg" />
            <Skeleton className="h-[52px] w-[200px] rounded-lg" />
          </div>
        </div>
      </div>
      <Separator className="my-8" />
    </div>
  );
};

export default SkeletonMyTicketLists;
