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
        "border-[1px] w-full md:max-w-sm py-2 px-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer", isFocused ? "shadow-md" : ""
      )}
    >
      <div className="flex flex-row items-center justify-between">
        <div className="text-lg pl-4 pr-6">
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
            "flex items-center gap-2 transition-all bg-rose-500 text-white rounded-full",
            isFocused ? "px-4 py-2 bg-rose-500 text-white rounded-full" : "p-2"
          )}
        >
          <div className="flex items-center gap-2">
            <BiSearch size={20} />
            {isFocused && <span className="text-sm font-semibold">Search</span>}
          </div>
        </div>
      </div>
    </label>
  );
};

export default Search;
