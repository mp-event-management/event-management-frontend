"use client";

import { getAllTicketsByCustomer } from "@/app/api/api";
import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import TicketListCard from "@/components/lists/TicketListCard";
import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/separator";
import { customerData } from "@/constant/usersData";
import { Ticket } from "@/types/tickets";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";

const MyTicketsPage: FC = () => {
  const length = 1;
  const customer = customerData;

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [currentPage, setCurrentpage] = useState(0);
  const [totalPage, setTotalPages] = useState(0);
  const searchParams = useSearchParams();

  // Default data per page
  const dataPerPage = 5;
  const query = searchParams.get("search")?.toString();

  const { data, isLoading } = useQuery({
    queryKey: ["tickets", currentPage, dataPerPage, query],
    queryFn: async () =>
      await getAllTicketsByCustomer(customer.id, currentPage, dataPerPage),
  });

  console.log(data);

  useEffect(() => {
    setTickets(data?.data.tickets);
    setTotalPages(data?.data.totalPages);
    console.log(data);
  }, [data, tickets]);

  const handlePrevPage = () => {
    setCurrentpage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentpage((prevPage) => prevPage + 1);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center text-lg font-bold text-rose-500 h-[calc(100vh-170px)] pt-14">
        Loading...
      </div>
    );
  }

  console.log(tickets);

  return (
    <section className="min-h-[calc(100vh-200px)]">
      <Container>
        <div className="flex items-center justify-between mt-8">
          <h1 className="text-3xl lg:text-4xl font-extrabold">
            My ticket lists
          </h1>
        </div>

        {length <= 0 ? (
          <EmptyState
            title="You dont have any tickets"
            subtitle="Please get a ticket first"
            showReset={false}
            height="h-[calc(100vh-280px)]"
          />
        ) : (
          <>
            <p>{data[0]}</p>
            <div className="pt-12 flex flex-col gap-12">
              {tickets?.map((ticket: Ticket) => {
                return (
                  <TicketListCard
                    customer={customer}
                    key={ticket.id}
                    data={ticket}
                  />
                );
              })}
            </div>
            <div className="flex items-center justify-center w-1/3 mx-auto gap-4 mt-20">
              <Button
                disabled={currentPage === 0}
                onClick={() => handlePrevPage()}
              >
                Previous
              </Button>
              <Button
                disabled={currentPage === totalPage - 1}
                onClick={() => handleNextPage()}
              >
                Next
              </Button>
            </div>
          </>
        )}
      </Container>
    </section>
  );
};

export default MyTicketsPage;
