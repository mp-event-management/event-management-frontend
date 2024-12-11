"use client";

import { formatDateTime } from "@/lib/utils";
import { Promotions } from "@/types/getEvents";
import React, { FC } from "react";
import { Button } from "../ui/Button";

type PromotionsProps = {
  promotions: Promotions[];
};

const PromotionsLists: FC<PromotionsProps> = ({ promotions }) => {
  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    alert("Promotion code copied to clipboard!");
  };

  return (
    <div className="flex flex-col items-start gap-4 w-full bg-[#F8F7FA] px-6 lg:px-10 py-8 rounded-2xl mb-8">
      <h3 className="text-[24px] font-extrabold">Promo code</h3>
      {promotions.length <= 0 && <p>No promo code available.</p>}
      {promotions.map((promo) => (
        <div
          key={promo.promotionId}
          className="flex flex-col items-start gap-1 bg-white py-6 px-8 rounded-lg w-full"
        >
          <div className="flex flex-col items-start w-full gap-1 mb-2 font-bold">
            <div className="flex justify-between items-center w-full">
              <p>Get {promo.discountPercentage * 100}% off &#128293;</p>
              <p className="text-green-700 text-[15px]">
                {promo.availableUses > 0
                  ? `${promo.availableUses} times left`
                  : ""}
              </p>
            </div>
            <span className="flex items-center gap-2">
              <p>Use before</p>
              {formatDateTime(promo.endDate).formattedDateTime}
            </span>
          </div>
          <div className="w-full flex items-center gap-3">
            <p className="text-lg font-extrabold bg-neutral-50 w-full px-4 py-2">
              {promo.promotionCode}
            </p>
            <Button
              variant="outline"
              onClick={() => handleCopyCode(promo.promotionCode)}
            >
              Copy
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PromotionsLists;
