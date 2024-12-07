import { FC } from "react";
import { LuSettings2 } from "react-icons/lu";

const Filter: FC = () => {
  return (
    <div className="flex items-center gap-4 border-[1px] px-6 py-4 rounded-xl text-neutral-500 cursor-pointer">
      <LuSettings2 size={22} />
      <span className="font-bold text-[16px]">Filter</span>
    </div>
  );
};

export default Filter;