"use client";

import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const Logo: FC = () => {
  return (
    <Link href={"/"}>
      <Image
        alt="logo"
        className="hidden md:block cursor-pointer"
        height="100"
        width="100"
        src="/images/logo.png"
      />
    </Link>
  );
};

export default Logo;
