"use client";

import { cn } from "@/lib/utils";
import { ChangeEvent, FC, useState } from "react";
import { BiSearch } from "react-icons/bi";

interface SearchBoxProps {
  onSearch: (query: string) => void;
}

const Search: FC<SearchBoxProps> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchText(query);
    onSearch(query);
  };

  return (
    <label
      htmlFor="search-input"
      className={cn(
        "border-[1px] w-full md:max-w-lg py-2 px-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer md:mr-3 mr-3",
        isFocused ? "shadow-md border-neutral-300" : ""
      )}
    >
      <div className="flex flex-row items-center justify-between">
        <div className="text-lg pl-4 pr-6 w-full">
          <input
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            id="search-input"
            type="text"
            value={searchText}
            onChange={handleInputChange}
            placeholder="Search events..."
            className="w-full outline-none text-gray-700 text-lg font-bold"
          />
        </div>
        <div
          className={cn(
            "flex items-center gap-2 transition-all duration-100 bg-rose-500 text-white rounded-full",
            isFocused ? "px-4 py-3 bg-rose-500 text-white" : "p-3"
          )}
        >
          <div className="flex items-center gap-2">
            <BiSearch size={20} />
            {isFocused && <span className="text-sm font-bold">Search</span>}
          </div>
        </div>
      </div>
    </label>
  );
};

export default Search;
