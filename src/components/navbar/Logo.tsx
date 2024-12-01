"use client";

import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const Logo: FC = () => {
  return (
    <Link href="/">
      <Image
        alt="logo"
        height="36"
        width="36"
        src="/images/eventbro-logo.svg"
        className="hidden md:block cursor-pointer w-full h-full"
      />
    </Link>
  );
};

export default Logo;
