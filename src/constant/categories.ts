import { TbArtboard, TbMusic, TbSocial } from "react-icons/tb";
import { FaArtstation, FaPeopleCarry } from "react-icons/fa";
import {
  GiConsoleController,
  GiLifeSupport,
  GiSportMedal,
} from "react-icons/gi";
import { GrBusinessService, GrTechnology } from "react-icons/gr";
import { BiDrink, BiFoodMenu } from "react-icons/bi";
import { SiStudyverse } from "react-icons/si";
import { MdTravelExplore } from "react-icons/md";
import {
  BookOpen,
  ComputerIcon,
  MapPinPlusIcon,
  MedalIcon,
} from "lucide-react";

export const categories = [
  // {
  //   label: "All Events",
  //   icon: SiEventstore,
  //   description: "All events",
  // },
  {
    id: 1,
    label: "Music",
    icon: TbMusic,
    description: "This is music events",
  },
  {
    id: 2,
    label: "Sports",
    icon: MedalIcon,
    description: "This is sports events",
  },
  {
    id: 3,
    label: "Social Activities",
    icon: FaPeopleCarry,
    description: "This is social activites events",
  },
  {
    id: 4,
    label: "Technologies",
    icon: ComputerIcon,
    description: "This is technologies events",
  },
  {
    id: 5,
    label: "Food & Drinks",
    icon: BiDrink,
    description: "This is food & drinks events",
  },
  {
    id: 6,
    label: "Art",
    icon: TbArtboard,
    description: "This is art events",
  },
  {
    id: 7,
    label: "Health & Wellness",
    icon: GiLifeSupport,
    description: "This is life health & wellness events",
  },
  {
    id: 8,
    label: "Education",
    icon: BookOpen,
    description: "This is education events",
  },
  {
    id: 9,
    label: "Travel",
    icon: MapPinPlusIcon,
    description: "This is travel events",
  },
  {
    id: 10,
    label: "Business",
    icon: GrBusinessService,
    description: "This is bussiness events",
  },
  {
    id: 11,
    label: "Gaming",
    icon: GiConsoleController,
    description: "This is gaming events",
  },
];

export const availableCategories = [
  {
    id: 1,
    label: "Music",
    icon: TbMusic,
    description: "This is music events",
  },
  {
    id: 2,
    label: "Sports",
    icon: GiSportMedal,
    description: "This is sports events",
  },
  {
    id: 3,
    label: "Social Activities",
    icon: TbSocial,
    description: "This is social activites events",
  },
  {
    id: 4,
    label: "Technologies",
    icon: GrTechnology,
    description: "This is technologies events",
  },
  {
    id: 5,
    label: "Food & Drinks",
    icon: BiFoodMenu,
    description: "This is food & drinks events",
  },
  {
    id: 6,
    label: "Art",
    icon: FaArtstation,
    description: "This is art events",
  },
  {
    id: 7,
    label: "Health & Wellness",
    icon: GiLifeSupport,
    description: "This is life health & wellness events",
  },
  {
    id: 8,
    label: "Education",
    icon: SiStudyverse,
    description: "This is education events",
  },
  {
    id: 9,
    label: "Travel",
    icon: MdTravelExplore,
    description: "This is travel events",
  },
  {
    id: 10,
    label: "Business",
    icon: GrBusinessService,
    description: "This is bussiness events",
  },
  {
    id: 11,
    label: "Gaming",
    icon: GiConsoleController,
    description: "This is gaming events",
  },
];
