"use client";

import React, { FC, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Button } from "../ui/Button";
import { createReview } from "@/app/api/api";
import { Separator } from "../ui/separator";

type RatingModalProps = {
  isOpen: boolean;
  eventId: number;
  customerId: number;
  onClose: () => void;
};

const RatingModal: FC<RatingModalProps> = ({
  isOpen,
  onClose,
  eventId,
  customerId,
}) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const requestData = {
    eventId: eventId,
    customerId: customerId,
    rating: Number(rating),
    reviewText: review,
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await createReview(requestData);

      setMessage(response.message);
      setRating(0);
      setReview("");
    } catch (error) {
      setMessage(`${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setRating(0);
    setHoverRating(0);
    setReview("");
    setMessage("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-all">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Gives your rate and review</h2>
        <Separator />
        <div className="flex justify-center mb-8 mt-8">
          {[1, 2, 3, 4, 5].map((value) => (
            <FaStar
              key={value}
              size={28}
              className={`cursor-pointer ${
                (hoverRating || rating) >= value
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
              onClick={() => setRating(value)}
              onMouseEnter={() => setHoverRating(value)}
              onMouseLeave={() => setHoverRating(0)}
            />
          ))}
        </div>

        <textarea
          className="w-full border rounded-lg p-2 mb-4 focus-visible:ring-0 placeholder:text-grey-500 placeholder:text-[16px] !text-[16px]"
          rows={4}
          placeholder="Write your review..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />

        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="notFull"
            onClick={handleSubmit}
            disabled={loading || rating === 0 || review.trim() === ""}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </div>

        {message && (
          <p
            className={`text-center mt-4 ${
              message.includes("Error") ? "text-red-500" : "text-green-500"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default RatingModal;
