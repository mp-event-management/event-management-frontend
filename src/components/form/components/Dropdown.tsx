"use client";

import React, { FC } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type DropdownProps = {
  datas: { id: number; label: string }[];
  placeholder: string;
  value?: string;
  onChangeHandler?: () => void;
};

const Dropdown: FC<DropdownProps> = ({
  datas,
  placeholder,
  value,
  onChangeHandler,
}) => {
  return (
    <Select onValueChange={onChangeHandler} defaultValue={value?.toString()}>
      <SelectTrigger className="w-full bg-neutral-100 h-[54px] placeholder:text-grey-500 rounded-full p-regular-16 px-5 py-3 border-none focus-visible:ring-transparent focus:ring-transparent">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {datas.length > 0 &&
          datas.map((data) => (
            <SelectItem
              key={data.id}
              value={data.id.toString()}
              className="py-3 cursor-pointer  focus:bg-primary-50 text-[14px] font-normal leading-[20px]"
            >
              {data.label}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export default Dropdown;
