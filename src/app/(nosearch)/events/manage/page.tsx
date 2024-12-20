"use client";

import { getEventsByOrganizeraId } from "@/app/api/api";
import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import EventListCard from "@/components/lists/EventListCard";
import { Button } from "@/components/ui/Button";
import { Event } from "@/types/eventDetails";
import { useQuery } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { FC, useEffect, useState } from "react";

const ManageEvents: FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentPage, setCurrentpage] = useState(0);
  const [totalPage, setTotalPages] = useState(0);
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  // Set default data per page
  const dataPerPage = 5;
  const params = searchParams.get("search")?.toString();
  const organizerId = session?.user.id;

  const { data, isLoading } = useQuery({
    queryFn: async () =>
      await getEventsByOrganizeraId(
        organizerId,
        currentPage,
        dataPerPage,
        params
      ),
    queryKey: ["events", organizerId, currentPage, dataPerPage, params],
  });

  useEffect(() => {
    setEvents(data?.data.events);
    setTotalPages(data?.data.totalPages);
  }, [data, events]);

  const handlePrevPage = () => {
    setCurrentpage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentpage((prevPage) => prevPage + 1);
  };

  return (
    <section className="min-h-[calc(100vh-210px)]">
      <Container>
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between lg:mt-8 mt-2">
          <h1 className="text-3xl lg:text-4xl font-extrabold text-start">
            Manage my events
          </h1>
          <Button variant="notFull" asChild>
            <Link href={"/events/create"}>
              Create new event
              <PlusIcon size={24} />
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center text-lg font-bold text-rose-500 h-[calc(100vh-280px)] pt-14">
            Loading...
          </div>
        ) : events?.length <= 0 ? (
          <EmptyState
            title="You dont have any event"
            subtitle="Please make a new event first"
            showReset={false}
            height="h-[calc(100vh-280px)]"
          />
        ) : (
          <>
            <div className="pt-12 lg:pt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
              {events?.map((event: Event) => {
                return (
                  <EventListCard
                    isShown={true}
                    organizerId={session?.user.id}
                    role={session?.user.roles[0]}
                    key={event.eventId}
                    data={event}
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

export default ManageEvents;
