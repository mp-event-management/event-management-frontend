"use client";

import React, { FC, useState } from "react";
import { FaStar } from "react-icons/fa";

type StarRatingProps = {
  rating: number; // Current rating value (0–5)
  onRatingChange?: (newRating: number) => void; // Callback for when the rating changes
  editable?: boolean; // Whether the user can change the rating
};

const StarRating: FC<StarRatingProps> = ({
  rating,
  editable,
  onRatingChange,
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (value: number) => {
    if (editable && onRatingChange) onRatingChange(value);
  };

  const handleMouseEnter = (value: number) => {
    if (editable) setHoverRating(value);
  };

  const handleMouseLeave = () => {
    if (editable) setHoverRating(0);
  };

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((value) => (
        <FaStar
          key={value}
          size={24}
          className={`cursor-pointer ${
            (hoverRating || rating) >= value
              ? "text-yellow-500"
              : "text-gray-300"
          }`}
          onClick={() => handleClick(value)}
          onMouseEnter={() => handleMouseEnter(value)}
          onMouseLeave={handleMouseLeave}
        />
      ))}
    </div>
  );
};

export default StarRating;
