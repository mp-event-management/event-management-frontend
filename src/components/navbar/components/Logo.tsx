"use client";

import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const Logo: FC = () => {
  return (
    <Link href="/" rel="preload">
      <Image
        alt="logo"
        height="50"
        width="200"
        src="/images/eventbro-logo.svg"
        className="hidden md:block cursor-pointer w-full h-full"
      />
    </Link>
  );
};

export default Logo;
