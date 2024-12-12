"use client";

import React, { FC, useEffect, useState } from "react";
import { Button } from "../ui/Button";
import { Modal } from "flowbite-react";
import { Event } from "@/types/getEvents";
import { cn, formatDateTime, formatPrice } from "@/lib/utils";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { createTransaction } from "@/app/api/api";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";

type TransactionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  event: Event;
};

// const customerUser = customerData;

const TransactionModal: FC<TransactionModalProps> = ({
  isOpen,
  onClose,
  event,
}) => {
  const [selectedPromo, setSelectedPromo] = useState<number | null>(null);
  const [useReferralPoints, setUseReferralPoints] = useState(false);
  const [useTransfer, setUseTransfer] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { data: session } = useSession();

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
    if (method === "referralPoints") setUseReferralPoints((prev) => !prev);
    if (method === "transfer") setUseTransfer((prev) => !prev);
  };

  const requestData = {
    // customerId: Number(customerUser.id),
    eventId: event.eventId,
    ticketQuantity: 1,
    promoCode:
      selectedPromo !== null
        ? event.promotions.find((p) => p.promotionId === selectedPromo)
            ?.promotionCode || ""
        : "",
    isUsePoints: useReferralPoints,
  };

  // console.log("update request data : ", requestData);
  const handleSubmit = async () => {
    setLoading(true);
    let toastMessage = "";

    try {
      // console.log("sent request data : ", requestData);
      const response = await createTransaction(
        requestData,
        session?.accessToken
      );

      toastMessage = response.message;
    } catch (error) {
      toastMessage = `${error}`;
    } finally {
      setLoading(false);
    }

    toast({ title: toastMessage });
  };

  return (
    <>
      <Modal show={isOpen} onClose={onClose} size="7xl">
        <Modal.Header className="w-full flex items-center justify-center">
          <p className="text-2xl font-extrabold line-clamp-1">
            Checkout - {event.title}
          </p>
        </Modal.Header>

        <Modal.Body className="">
          <div className="flex w-full min-h-[530px] justify-between gap-4 flex-col lg:flex-row">
            <div className="lg:px-8 py-2 grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
              <div>
                <p className="text-xl font-bold mb-6">Available Event promo</p>
                <div className="flex lg:flex-col lg:gap-0 gap-4 lg:overflow-x-hidden overflow-x-auto">
                  {event.promotions && event.promotions.length > 0 ? (
                    event.promotions.map((promo) => (
                      <div
                        key={promo.promotionId}
                        onClick={() => handlePromoSelect(promo.promotionId)}
                        className={cn(
                          "mb-6 border-[1px] p-4 rounded-lg border-neutral-300 cursor-pointer transition-all w-full min-w-[250px] lg:min-w-[300px] max-w-full",
                          selectedPromo === promo.promotionId
                            ? "border-green-700 bg-green-50"
                            : "border-neutral-300 hover:border-neutral-800"
                        )}
                      >
                        <p className="text-[14px] lg:text-[16px] font-extrabold text-gray-700">
                          {promo.promotionCode}
                        </p>
                        <p className="text-[13px] lg:text-[16px] text-green-500">
                          Get {promo.discountPercentage * 100}% off
                        </p>
                        {promo.availableUses && (
                          <div className="flex flex-col mt-2">
                            <p className="text-[14px] lg:text-[15px]">
                              {promo.availableUses} uses left
                            </p>
                            <p className="text-[13px] text-neutral-400">
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
              </div>

              {/* Select payment method section */}
              <div className="">
                <p className="text-xl font-bold mb-6">Payment Method</p>
                <div
                  onClick={() => togglePaymentMethod("referralPoints")}
                  className={cn(
                    "mb-6 border-[1px] p-4 rounded-lg border-neutral-300 cursor-pointer transition-all",
                    useReferralPoints
                      ? "border-green-700 bg-green-50"
                      : "border-neutral-300 hover:border-neutral-800"
                  )}
                >
                  <p className="text-[16px] font-extrabold text-gray-700 mb-1">
                    Referral Points
                  </p>
                  <p className="text-sm text-gray-500">
                    Use your available points from registered using your
                    referral code.
                  </p>
                </div>
                <div
                  onClick={() => togglePaymentMethod("transfer")}
                  className={cn(
                    "mb-6 border-[1px] p-4 rounded-lg border-neutral-300 cursor-pointer transition-all",
                    useTransfer
                      ? "border-green-700 bg-green-50"
                      : "border-neutral-300 hover:border-neutral-800"
                  )}
                >
                  <p className="text-[16px] font-extrabold text-gray-700 mb-1">
                    Transfer
                  </p>
                  <p className="text-sm text-gray-500">
                    Pay directly via you desired bank transfer.
                  </p>
                </div>
              </div>
            </div>

            {/* Order detail section */}
            {/* <div className="flex flex-col bg-slate-50"> */}
            <div className="flex flex-col bg-slate-50 w-full lg:w-[430px]">
              <div className="lg:h-[150px] lg:w-[430px] h-[100px] aspect-square overflow-hidden mb-2 relative">
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

                {/* Show selected promo */}
                <div className="flex flex-col text-sm text-green-600 mb-4">
                  <p className="font-bold">Used Promo:</p>
                  {selectedPromo !== null ? (
                    <p>
                      {event.promotions.find(
                        (promo) => promo.promotionId === selectedPromo
                      )?.promotionCode || "Invalid Promo"}
                    </p>
                  ) : (
                    <p>-</p>
                  )}
                </div>

                {/* Show discount calculation */}
                <div className="flex flex-col justify-between">
                  <div className="flex justify-between font-normal">
                    <p>1 x eTicket</p>
                    <p>{formatPrice(String(event.ticketPrice))}</p>
                  </div>

                  <div className="flex flex-col mt-4 text-green-600">
                    <div className="flex justify-between">
                      <p>Discount %</p>
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

                  <div className="flex justify-between font-bold mt-4 transition-all duration-200 pb-4">
                    <p>Total</p>
                    <p>{formatPrice(String(calculateTotalPrice()))}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <div className="flex items-center justify-end w-full gap-6">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="notFull" onClick={handleSubmit} disabled={loading}>
              {loading ? "Purchasing..." : "Purchase ticket"}
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TransactionModal;
