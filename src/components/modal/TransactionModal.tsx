"use client";

import React, { FC, useEffect, useState } from "react";
import { Button } from "../ui/Button";
import { Modal } from "flowbite-react";
import { Event } from "@/types/getEvents";
import { cn, formatDateTime, formatPrice } from "@/lib/utils";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { customerData } from "@/constant/usersData";
import { createTransaction } from "@/app/api/api";

type TransactionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  event: Event;
};

const customerUser = customerData;

const TransactionModal: FC<TransactionModalProps> = ({
  isOpen,
  onClose,
  event,
}) => {
  const [selectedPromo, setSelectedPromo] = useState<number | null>(null);
  const [useReferralPoints, setUseReferralPoints] = useState(false);
  const [useTransfer, setUseTransfer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const resetSelections = () => {
    setSelectedPromo(null);
    setUseReferralPoints(false);
    setUseTransfer(false);
  };

  // Reset selections whenever the modal is opened
  useEffect(() => {
    if (!isOpen) {
      resetSelections();
    }
  }, [isOpen]);

  const calculateTotalPrice = () => {
    if (selectedPromo === null) return event.ticketPrice;
    const promo = event.promotions.find((p) => p.promotionId === selectedPromo);
    if (!promo) return event.ticketPrice;
    return event.ticketPrice * (1 - promo.discountPercentage);
  };

  const handlePromoSelect = (promoId: number) => {
    if (selectedPromo === promoId) setSelectedPromo(null);
    else setSelectedPromo(promoId);
  };

  const togglePaymentMethod = (method: "referralPoints" | "transfer") => {
    if (method === "referralPoints") setUseReferralPoints(!useReferralPoints);
    if (method === "transfer") setUseTransfer(!useTransfer);
  };

  const requestData = {
    customerId: Number(customerUser.id),
    eventId: event.eventId,
    ticketQuantity: event.availableTicket >= 1 ? 1 : 0,
    promoCode:
      selectedPromo !== null
        ? event.promotions.find((p) => p.promotionId === selectedPromo)
            ?.promotionCode || ""
        : "",
    isUsePoints: useReferralPoints,
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await createTransaction(requestData);

      setMessage(response.message);
    } catch (error) {
      setMessage(`${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal show={isOpen} onClose={onClose} size="6xl">
        <Modal.Header className="w-full">
          <p className="text-xl font-extrabold w-full text-center">Checkout</p>
        </Modal.Header>

        <Modal.Body className="p-0 lg:min-h-[500px]">
          <div className="flex w-full min-h-[500px] justify-between gap-4">
            <div className="p-8 grid grid-cols-2 gap-8 w-full">
              <div>
                <p className="text-xl font-bold mb-6">Available Event promo</p>
                {event.promotions && event.promotions.length > 0 ? (
                  event.promotions.map((promo) => (
                    <div
                      key={promo.promotionId}
                      onClick={() => handlePromoSelect(promo.promotionId)}
                      className={cn(
                        "mb-6 border-[1px] p-4 rounded-lg border-neutral-300 cursor-pointer transition-all",
                        selectedPromo === promo.promotionId
                          ? "border-neutral-800 bg-gray-50"
                          : "border-neutral-300 hover:border-neutral-800"
                      )}
                    >
                      <p className="text-[16px] font-extrabold text-gray-700">
                        {promo.promotionCode}
                      </p>
                      <p className="text-[16px] text-green-500">
                        Get {promo.discountPercentage * 100}% off
                      </p>
                      {promo.availableUses && (
                        <div>
                          <p className="text-[16px]">
                            {promo.availableUses} uses left
                          </p>
                          <p className="text-[14px] text-neutral-400">
                            Ends in{" "}
                            {formatDateTime(promo.endDate).formattedDateTime}
                          </p>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 w-full h-full flex">
                    No promotions available.
                  </p>
                )}
              </div>

              {/* Select payment method section */}
              <div className="">
                <p className="text-xl font-bold mb-6">Choose Payment Method</p>
                <div
                  onClick={() => togglePaymentMethod("referralPoints")}
                  className={cn(
                    "mb-6 border-[1px] p-4 rounded-lg border-neutral-300 cursor-pointer transition-all",
                    useReferralPoints
                      ? "border-neutral-800 bg-gray-50"
                      : "border-neutral-300 hover:border-neutral-800"
                  )}
                >
                  <p className="text-[16px] font-bold">Referral Points</p>
                  <p className="text-sm text-gray-500">
                    Use your referral points .
                  </p>
                </div>
                <div
                  onClick={() => togglePaymentMethod("transfer")}
                  className={cn(
                    "mb-6 border-[1px] p-4 rounded-lg border-neutral-300 cursor-pointer transition-all",
                    useTransfer
                      ? "border-neutral-800 bg-gray-50"
                      : "border-neutral-300 hover:border-neutral-800"
                  )}
                >
                  <p className="text-[16px] font-bold">Transfer</p>
                  <p className="text-sm text-gray-500">
                    Pay directly via transfer.
                  </p>
                </div>
              </div>
            </div>

            {/* Order detail section */}
            <div className="flex flex-col bg-slate-50">
              <div className="h-[150px] w-[430px] aspect-square overflow-hidden mb-2 relative">
                <Image
                  src={event.eventImagesUrl}
                  height={400}
                  width={400}
                  alt={event.title}
                  className="object-cover h-full w-full hover:scale-110 transition"
                />
              </div>
              <div className="px-7 flex flex-col">
                <p className="text-lg font-bold line-clamp-2 mb-2">
                  Order details
                </p>

                <Separator className="my-2" />

                <p className="text-[16px] font-bold line-clamp-2">
                  {event.title}
                </p>
                <div className="flex gap-2 text-sm">
                  <p>{formatDateTime(event.startDate).formattedDateTime}</p>-
                  <p>{formatDateTime(event.endDate).formattedDateTime}</p>
                </div>

                <Separator className="my-4" />

                {/* Show discount calculation */}
                <div className="flex flex-col justify-between">
                  <div className="flex justify-between font-normal">
                    <p>1 x eTicket</p>
                    <p>{formatPrice(String(event.ticketPrice))}</p>
                  </div>

                  <div className="flex flex-col mt-4 text-green-600">
                    <div className="flex justify-between">
                      <p>Discount Percentage</p>
                      <p>
                        {selectedPromo !== null
                          ? `${
                              (event.promotions.find(
                                (promo) => promo.promotionId === selectedPromo
                              )?.discountPercentage || 0) * 100
                            }%`
                          : "0%"}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p>Discount Amount</p>
                      <p>
                        -
                        {formatPrice(
                          String(
                            selectedPromo !== null
                              ? event.ticketPrice *
                                  (event.promotions.find(
                                    (promo) =>
                                      promo.promotionId === selectedPromo
                                  )?.discountPercentage || 0)
                              : 0
                          )
                        )}
                      </p>
                    </div>
                  </div>

                  <Separator className="my-2" />

                  <div className="flex justify-between font-bold">
                    <p>Total</p>
                    <p>{formatPrice(String(calculateTotalPrice()))}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <div className="w-full flex items-center justify-end gap-4">
            <div>
              {message && (
                <p
                  className={`text-center mt-4 ${
                    message.includes("Error")
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {message}
                </p>
              )}
            </div>
            <div className="flex gap-4">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                variant="notFull"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Purchasing..." : "Purchase"}
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TransactionModal;
