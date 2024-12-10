"use client";

import { getTransactionDetail } from "@/app/api/api";
import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";

const TicketDetailsPage = () => {
  const { id } = useParams();
  console.log("Ticket id: ", id);

  const { data, isLoading } = useQuery({
    queryKey: ["event", id],
    queryFn: async () => await getTransactionDetail(id),
  });

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
      <section className="h-[calc(100vh-180px)] flex w-[60%] mx-auto items-center justify-center">
        Transaction {id}
        {/* <div className="w-full max-w-3xl mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
          <h1 className="text-3xl font-extrabold text-center mb-6">Invoice</h1>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              {transaction.eventName}
            </h2>
            <p className="text-lg text-gray-700 mb-2">
              {transaction.eventCityLocation}
            </p>
            <p className="text-lg text-gray-700">{transaction.eventAddress}</p>
          </div>

          <div className="border-t border-b py-6 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold">Customer Information</h3>
                <p className="text-lg text-gray-700">
                  Name: {transaction.customerName}
                </p>
                <p className="text-lg text-gray-700">
                  Customer ID: {transaction.customerId}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Event Information</h3>
                <p className="text-lg text-gray-700">
                  Event Start:{" "}
                  {formatDateTime(eventStartDate).formattedDateTime}
                </p>
                <p className="text-lg text-gray-700">
                  Event End: {formatDateTime(eventEndDate).formattedDateTime}
                </p>
                <p className="text-lg text-gray-700">
                  Invoice Code: {transaction.invoiceCode}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 mb-8">
            <h3 className="text-xl font-semibold">Ticket Details</h3>
            <p className="text-lg text-gray-700">
              Ticket Quantity: {transaction.ticketQuantity}
            </p>
            <p className="text-lg text-gray-700">
              Ticket Price: IDR {transaction.ticketPrice.toLocaleString()}
            </p>
            <p className="text-lg text-gray-700">
              Discount: IDR {transaction.totalDiscount.toLocaleString()}
            </p>
            <p className="text-lg text-gray-700">
              Referral Points Used: IDR{" "}
              {transaction.referralPointsUsed.toLocaleString()}
            </p>
          </div>

          <div className="border-t pt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Payment Summary</h3>
              <p className="text-lg font-bold">
                Final Price: IDR {transaction.finalPrice.toLocaleString()}
              </p>
            </div>
            <p className="text-lg text-gray-700">
              Payment Status: {transaction.paymentStatus}
            </p>
          </div>

          <div className="flex justify-center mt-8">
            <Button variant="outline" asChild>
              <a
                href={`/my-tickets/${transaction.transactionId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                See More Details
                <TbInvoice className="ml-2" />
              </a>
            </Button>
          </div>
        </div> */}
      </section>
    </Container>
  );
};

export default TicketDetailsPage;
