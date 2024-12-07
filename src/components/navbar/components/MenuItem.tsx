"use client";
import { FC } from "react";

interface MenuItemProps {
  onClick: () => void;
  label: string;
}

const MenuItem: FC<MenuItemProps> = ({ onClick, label }) => {
  return (
    <div
      onClick={onClick}
      className="px-6 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer"
    >
      {label}
    </div>
  );
};

export default MenuItem;
