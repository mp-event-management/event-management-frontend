"use client";

import React, { FC, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { availableCategories } from "@/constant/categories";

type DropdownProps = {
  value?: number;
  onChangeHandler?: () => void;
};

const Dropdown: FC<DropdownProps> = ({ value, onChangeHandler }) => {
  return (
    <Select onValueChange={onChangeHandler} defaultValue={value?.toString()}>
      <SelectTrigger className="w-full bg-neutral-100 h-[54px] placeholder:text-grey-500 rounded-full p-regular-16 px-5 py-3 border-none focus-visible:ring-transparent focus:ring-transparent">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {availableCategories.length > 0 &&
          availableCategories.map((category) => (
            <SelectItem
              key={category.id}
              value={category.id.toString()}
              className="py-3 cursor-pointer  focus:bg-primary-50 text-[14px] font-normal leading-[20px]"
            >
              {category.label}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export default Dropdown;
