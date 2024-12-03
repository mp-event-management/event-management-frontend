"use client";

import { FC } from "react";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { categories } from "@/constant/categories";
import Filter from "./Filter";

const Categories: FC = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();

  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <nav className="overflow-x-auto max-w-[2020px] h-[96px] xl:px-20 md:px-10 sm:px-6 px-6 flex items-center">
      <div className="flex items-center justify-between w-full gap-6">
        <div className="flex items-center justify-between w-full">
          {categories.map((item) => (
            <CategoryBox
              key={item.label}
              label={item.label}
              selected={category === item.label}
              icon={item.icon}
            />
          ))}
        </div>
        <div className="flex items-center">
          <Filter />
        </div>
      </div>
    </nav>
  );
};

export default Categories;
