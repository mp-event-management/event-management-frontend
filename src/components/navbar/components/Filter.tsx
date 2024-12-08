import { FC } from "react";
import { LuSettings2 } from "react-icons/lu";

const Filter: FC = () => {
  return (
    <div className="flex items-center gap-4 border-2 px-4 lg:px-6 py-4 rounded-xl text-neutral-800 cursor-pointer">
      <LuSettings2 size={22} />
      <span className="hidden lg:block font-bold text-[16px]">Filters</span>
    </div>
  );
};

export default Filter;
