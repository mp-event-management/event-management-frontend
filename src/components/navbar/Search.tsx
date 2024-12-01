"use client";

import { ChangeEvent, FC, useState } from "react";
import { BiSearch } from "react-icons/bi";

interface SearchBoxProps {
  onSearch: (query: string) => void;
}

const Search: FC<SearchBoxProps> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchText(query);
    onSearch(query);
  };

  return (
    <div className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
      <div className="flex flex-row items-center justify-between">
        <div className="text-lg font-semibold px-8">
          <input
            type="text"
            value={searchText}
            onChange={handleInputChange}
            placeholder="Search events..."
            className="w-full outline-none text-gray-700"
          />
        </div>
        <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
          <div
            onClick={() => {}}
            className="p-2 bg-rose-500 rounded-full text-white"
          >
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
