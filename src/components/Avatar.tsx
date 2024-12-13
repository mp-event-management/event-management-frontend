"use client";

import Image from "next/image";
import { FC } from "react";

const Avatar: FC = () => {
  return (
    <Image
      className="rounded-full"
      height={30}
      width={30}
      alt="Avatar"
      src="https://placehold.co/30x30"
    />
  );
};

export default Avatar;
