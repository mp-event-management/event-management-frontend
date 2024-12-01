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
        "flex flex-col items-center justify-center text-center gap-2 min-w-[140px] max-w-[200px] p-2 border-b-2 w-full hover:text-neutral-800 transition cursor-pointer",
        {
          "border-b-neutral-950 text-black": selected,
          "text-neutral-600 border-transparent": !selected,
        }
      )}
    >
      <Icon size={22} />
      <div className="font-semibold text-[14px]">{label}</div>
    </div>
  );
};

export default CategoryBox;
