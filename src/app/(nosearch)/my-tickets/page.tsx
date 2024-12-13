"use client";

import { getAllTicketsByCustomer } from "@/app/api/api";
import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import TicketListCard from "@/components/lists/TicketListCard";
import SkeletonMyTicketLists from "@/components/loading/SkeletonMyTicketLists";
import { Button } from "@/components/ui/Button";
import { Ticket } from "@/types/tickets";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { FC, useEffect, useState } from "react";

const MyTicketsPage: FC = () => {
  const { data: session } = useSession();
  const customerId = session?.user.id;

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [currentPage, setCurrentpage] = useState(0);
  const [totalPage, setTotalPages] = useState(0);

  // Default data per page
  const dataPerPage = 5;

  const { data, isLoading } = useQuery({
    queryKey: ["tickets", currentPage, dataPerPage],
    queryFn: async () =>
      await getAllTicketsByCustomer(
        Number(customerId),
        currentPage,
        dataPerPage
      ),
  });

  useEffect(() => {
    setTickets(data?.data.tickets);
    setTotalPages(data?.data.totalPages);
  }, [data, tickets]);

  const handlePrevPage = () => {
    setCurrentpage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentpage((prevPage) => prevPage + 1);
  };

  return (
    <section className="min-h-[calc(100vh-200px)]">
      <Container>
        <div className="flex lg:mx-auto items-center justify-between lg:mt-8 mt-4">
          <h1 className="text-3xl lg:text-4xl font-extrabold">
            My ticket lists
          </h1>
        </div>

        {isLoading ? (
          <div className="mt-20">
            {"abcde.".split("").map((i) => {
              return <SkeletonMyTicketLists key={i} />;
            })}
          </div>
        ) : tickets?.length <= 0 ? (
          <EmptyState
            title="You dont have any tickets"
            subtitle="Please get a ticket first"
            showReset={false}
            height="h-[calc(100vh-280px)]"
          />
        ) : (
          <>
            <div className="lg:pt-20 pt-8 lg:w-[100%] lg:mx-auto flex flex-col gap-12 min-h-[calc(100vh-320px)]">
              {tickets?.map((ticket: Ticket) => {
                return (
                  <TicketListCard
                    customer={Number(customerId)}
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
