'use client';

import { useRouter } from "next/navigation";
import React, { FC } from "react";
import { IoArrowBack } from "react-icons/io5";

const BackButton: FC = () => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <button
      onClick={handleBackClick}
      className="lg:hover:bg-neutral-100 lg:rounded-full lg:p-4 rounded-full transition mb-4"
    >
      <IoArrowBack size={24} />
    </button>
  );
};

export default BackButton;
