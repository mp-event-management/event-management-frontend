"use client";

import { useRouter } from "next/navigation";
import { FC } from "react";
import { Button } from "./ui/button";

interface EmptyState {
  title: string;
  subtitle: string;
  showReset: boolean;
}

const EmptyState: FC<EmptyState> = ({
  title = "No exact matches",
  subtitle = "Try changing or removing some of your filters",
  showReset,
}) => {
  const router = useRouter();

  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      {/* <Heading title={title} subtitle={subtitle} /> */}
      <div className="w-48 mt-4">
        {showReset && (
          <Button onClick={() => router.push("/")}>Remove all filters</Button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
