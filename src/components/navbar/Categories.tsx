"use client";
import { FC } from "react";
import Container from "../Container";
import { TbMusic, TbSocial } from "react-icons/tb";
import { FaArtstation } from "react-icons/fa";
import {
  GiConsoleController,
  GiLifeSupport,
  GiSportMedal,
} from "react-icons/gi";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { GrBusinessService, GrTechnology } from "react-icons/gr";
import { BiFoodMenu } from "react-icons/bi";
import { SiStudyverse } from "react-icons/si";
import { MdTravelExplore } from "react-icons/md";

export const categories = [
  {
    label: "Music",
    icon: TbMusic,
    description: "This is music events",
  },
  {
    label: "Sports",
    icon: GiSportMedal,
    description: "This is sports events",
  },
  {
    label: "Social Activities",
    icon: TbSocial,
    description: "This is social activites events",
  },
  {
    label: "Technologies",
    icon: GrTechnology,
    description: "This is technologies events",
  },
  {
    label: "Food & Drinks",
    icon: BiFoodMenu,
    description: "This is food & drinks events",
  },
  {
    label: "Art",
    icon: FaArtstation,
    description: "This is art events",
  },
  {
    label: "Health & Wellness",
    icon: GiLifeSupport,
    description: "This is life health & wellness events",
  },
  {
    label: "Education",
    icon: SiStudyverse,
    description: "This is education events",
  },
  {
    label: "Travel",
    icon: MdTravelExplore,
    description: "This is travel events",
  },
  {
    label: "Bussiness",
    icon: GrBusinessService,
    description: "This is bussiness events",
  },
  {
    label: "Gaming",
    icon: GiConsoleController,
    description: "This is gaming events",
  },
];

const Categories: FC = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();

  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div className="flex flex-row items-center justify-between overflow-x-auto pt-4">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            selected={category === item.label}
            icon={item.icon}
          ></CategoryBox>
        ))}
      </div>
    </Container>
  );
};

export default Categories;
