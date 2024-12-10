"use client";

import React, { FC, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Button } from "../ui/Button";
import { createReview } from "@/app/api/api";

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
    setMessage("");
    try {
      console.log(requestData);
      const response = await createReview(requestData);
      console.log(response);

      setMessage(response.message);
      setRating(0);
      setReview("");
    } catch (error) {
      setMessage(`${error}`);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-all">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Gives your rate and review</h2>

        <div className="flex justify-center mb-4 mt-8">
          {[1, 2, 3, 4, 5].map((value) => (
            <FaStar
              key={value}
              size={28}
              className={`cursor-pointer ${
                (hoverRating || rating) >= value
                  ? "text-yellow-500"
                  : "text-gray-300"
              }`}
              onClick={() => setRating(value)}
              onMouseEnter={() => setHoverRating(value)}
              onMouseLeave={() => setHoverRating(0)}
            />
          ))}
        </div>

        <textarea
          className="w-full border rounded-lg p-2 mb-4 focus-visible:ring-0"
          rows={4}
          placeholder="Write your review..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />

        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={onClose}>
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
              message.includes("Failed") ? "text-red-500" : "text-green-500"
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
