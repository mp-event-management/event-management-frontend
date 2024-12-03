"use client";

import { FC } from "react";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { categories } from "@/constant/categories";

const Categories: FC = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();

  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <nav className="overflow-x-auto">
      <div className="flex items-center justify-between max-w-[2020px] xl:px-20 md:px-10 sm:px-6 pt-6 px-6">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            selected={category === item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </nav>
  );
};

export default Categories;
