"use client";

import { useRouter } from "next/navigation";
import { FC } from "react";
import { Button } from "./ui/Button";
import Heading from "./Heading";

interface EmptyState {
  title?: string;
  subtitle?: string;
  showReset: boolean;
}

const EmptyState: FC<EmptyState> = ({
  title = "No events found",
  subtitle = "Try changing or removing some of your filters",
  showReset,
}) => {
  const router = useRouter();

  return (
    <div className="h-[calc(100vh-170px)] w-full px-8 flex flex-col gap-2 justify-center items-center pt-14">
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
