"use client";

import { useRouter } from "next/navigation";
import { FC } from "react";
import { Button } from "./ui/Button";
import Heading from "./Heading";
import { cn } from "@/lib/utils";

interface EmptyState {
  title?: string;
  subtitle?: string;
  showReset: boolean;
  height: string;
}

const EmptyState: FC<EmptyState> = ({
  title = "No events found",
  subtitle = "Try changing or removing some of your filters",
  showReset,
  height,
}) => {
  const router = useRouter();

  return (
    <div
      className={cn(
        "w-full px-8 flex flex-col gap-2 justify-center items-center pt-14",
        height ? height : "h-[calc(100vh-170px)]"
      )}
    >
      <Heading title={title} subtitle={subtitle} />
      <div className="w-auto mt-4">
        {showReset && (
          <Button onClick={() => router.push("/")}>Remove all filters</Button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
