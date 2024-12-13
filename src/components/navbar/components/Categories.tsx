"use client";

import { FC } from "react";
import CategoryBox from "../../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { categories } from "@/constant/categories";
import Filter from "./Filter";

const Categories: FC = () => {
  const params = useSearchParams();
  const category = params?.get("categoryId");
  const pathname = usePathname();

  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <nav className="max-w-[2020px] h-[96px] xl:px-20 md:px-10 sm:px-6 px-6 flex items-center">
      <div className="flex items-center justify-between w-full gap-6">
        <div className="overflow-x-auto flex items-center justify-between w-full">
          {categories.map((item) => (
            <CategoryBox
              key={item.label}
              label={item.label}
              id={String(item.id)}
              selected={category === String(item.id)}
              icon={item.icon}
            />
          ))}
        </div>
        <div className="flex items-center w-auto">
          <Filter />
        </div>
      </div>
    </nav>
  );
};

export default Categories;
