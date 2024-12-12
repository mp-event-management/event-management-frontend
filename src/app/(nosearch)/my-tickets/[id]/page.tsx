"use client";

import { getTransactionDetail } from "@/app/api/api";
import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import Logo from "@/components/navbar/components/Logo";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import { TransactionDetail } from "@/types/transaction";
import { useQuery } from "@tanstack/react-query";
import { Check, Verified } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const TicketDetailsPage = () => {
  const { id } = useParams();
  const [trxDetails, setTrxDetails] = useState<TransactionDetail>();

  const { data, isLoading } = useQuery({
    queryKey: ["event", id],
    queryFn: async () => await getTransactionDetail(id),
  });

  useEffect(() => {
    setTrxDetails(data);
  }, [data]);
  console.log(data);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center text-lg font-bold text-rose-500 h-[calc(100vh-170px)] pt-14">
        Loading...
      </div>
    );
  }

  if (!data) {
    return (
      <EmptyState
        title="There is no transaction details"
        subtitle="Please try again later"
        showReset={false}
        height="h-[calc(100vh-280px)]"
      />
    );
  }

  return (
    <Container>
      <section className="h-[calc(100vh-180px)] flex flex-col md:w-[40%] lg:w-[30%] mx-auto items-center justify-center p-6 lg:p-12 bg-slate-50 rounded-xl">
        <div className="mb-10">
          <Logo />
        </div>
        <div className="bg-green-100 p-4 rounded-full mb-2">
          <p className="bg-green-500 p-2 rounded-full text-white">
            <Check />
          </p>
        </div>
        <div className="flex flex-col items-center gap-3 pt-3 w-full">
          <p>Payment success!</p>
          <p className="text-lg font-bold">
            {formatPrice(String(trxDetails?.finalPrice))}
          </p>
          <Separator className="my-4" />
          <div className="flex justify-between items-center w-full">
            <p>Buyer</p>
            <p className="font-bold">{trxDetails?.customerName}</p>
          </div>
          <div className="flex justify-between items-center w-full">
            <p className="w-full">Event</p>
            <p className="line-clamp-1 font-bold w-full">{trxDetails?.eventName}</p>
          </div>
          <div className="flex justify-between items-center w-full">
            <p>Ticket price</p>
            <p className="font-bold">
              {formatPrice(String(trxDetails?.ticketPrice))}
            </p>
          </div>
          <div className="flex justify-between items-center w-full">
            <p>Points used </p>
            <p className="font-bold">
              {formatPrice(String(trxDetails?.referralPointsUsed))}
            </p>
          </div>
          <div className="flex justify-between items-center w-full">
            <p>Amount discount </p>
            <p className="font-bold">
              {formatPrice(String(trxDetails?.totalDiscount))}
            </p>
          </div>
          <Separator className="my-4" />
          <div className="flex justify-between items-center w-full">
            <p>Total</p>
            <p className="font-bold">
              {formatPrice(String(trxDetails?.finalPrice))}
            </p>
          </div>
          <Separator className="my-4" />
          <p className="text-xl font-bold">{trxDetails?.invoiceCode}</p>
        </div>
      </section>
    </Container>
  );
};

export default TicketDetailsPage;
