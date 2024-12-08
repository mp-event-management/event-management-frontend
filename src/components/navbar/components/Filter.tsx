"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cities } from "@/constant/cities";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, useState } from "react";
import { LuSettings2 } from "react-icons/lu";

const Filter: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onSelectCity = (city: string) => {
    let newUrl = "";

    if (city && city !== "All City") {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "cityId",
        value: city,
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["cityId"],
      });
    }
    router.push(newUrl, { scroll: false });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex items-center gap-4  text-neutral-800 border-2 px-4 lg:px-6 py-4 rounded-xl overflow-hidden">
        <LuSettings2 size={22} />
        <span className="hidden lg:block font-bold text-[16px]">Filters</span>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white overflow-hidden">
        <AlertDialogHeader className="mb-10">
          <AlertDialogTitle className="text-[18px] font-bold text-center pb-2">
            Filters
          </AlertDialogTitle>
          <Separator />
          <AlertDialogDescription className="text-lg pt-4 text-neutral-800">
            Choose where the event location
            {/* Select location city */}
            <Select
              onValueChange={(value: string) => {
                onSelectCity(value);
              }}
            >
              <SelectTrigger className="mt-8 w-full h-[52px] overflow-hidden focus:ring-0">
                <SelectValue placeholder="City" />
              </SelectTrigger>
              <SelectContent className="placeholder:text-[16px] placeholder:font-bold">
                <SelectItem
                  value="All City"
                  className="text-[16px] font-bold cursor-pointer"
                >
                  All City
                </SelectItem>
                {cities.map((city) => (
                  <SelectItem
                    key={city.id}
                    value={String(city.id)}
                    className="text-[16px] font-bold cursor-pointer"
                  >
                    {city.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Show events</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Filter;
