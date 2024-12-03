"use client";

import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { FC, useCallback } from "react";
import { IconType } from "react-icons";

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected: boolean;
}

const CategoryBox: FC<CategoryBoxProps> = ({ icon: Icon, label, selected }) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuerry = {};

    if (params) {
      currentQuerry = queryString.parse(params.toString());

      const updatedQuery: Record<string, string | string[] | null> = {
        ...currentQuerry,
        category: label,
      };

      if (params?.get("category") === label) {
        delete updatedQuery.category;
      }

      const url = queryString.stringifyUrl(
        {
          url: "/",
          query: updatedQuery,
        },
        { skipNull: true }
      );
      router.push(url);
    }
  }, [label, params, router]);

  return (
    <div
      onClick={handleClick}
      className={cn(
        "flex flex-col items-center justify-center text-center gap-2 px-6 w-full hover:text-neutral-900 transition cursor-pointer",
        selected ? "text-neutral-900" : "text-neutral-500"
      )}
    >
      <div
        className={cn(
          "flex flex-wrap relative transition duration-100",
          selected
            ? "border-b-2 border-neutral-800"
            : "border-b-2 border-transparent"
        )}
      >
        <div className="flex flex-col items-center gap-2">
          <Icon size={24} />
          <span className="font-bold text-[14px] whitespace-nowrap">
            {label}
          </span>
        </div>
        <span
          className={cn(
            "flex flex-col items-end border-b-2",
            selected
              ? "border-b-2 border-neutral-800"
              : "border-b-2 border-transparent"
          )}
        />
      </div>
    </div>
  );
};

export default CategoryBox;
