"use client";

import getEventsByOrganizeraId from "@/app/actions/getEventsByOrganizerId.action";
import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import EventListCard from "@/components/lists/EventListCard";
import { Button } from "@/components/ui/Button";
import { Event } from "@/types/getEvents";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React, { FC, useEffect, useState } from "react";

const ManageEvents: FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentPage, setCurrentpage] = useState(0);
  const [totalPage, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  // const { data } = useSession();

  // TODO: This is still harcoded, need to get from session
  const ORGANIZER_ID = 1;

  useEffect(() => {
    console.log("home:", searchParams.get("search"));
    const dataPerPage = 5;

    const fetchEvents = async () => {
      setLoading(true);

      try {
        const params = searchParams.get("search")?.toString();
        const data = await getEventsByOrganizeraId(
          ORGANIZER_ID,
          currentPage,
          dataPerPage,
          params
        );

        // Check if the data structured as expected
        if (!data || !data.data || !data.data.events) {
          throw new Error("Unexpected API response structure");
        }

        setEvents(data.data.events);
        setTotalPages(data.data.totalPages);
      } catch (error) {
        console.log(error);
        throw error;
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [currentPage, searchParams]);

  const handlePrevPage = () => {
    setCurrentpage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentpage((prevPage) => prevPage + 1);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center text-lg font-bold text-rose-500 h-[calc(100vh-170px)] pt-14">
        Loading...
      </div>
    );
  }

  return (
    <section className="min-h-[calc(100vh-210px)]">
      <Container>
        <div className="flex items-center justify-between mt-8">
          <h1 className="text-3xl lg:text-4xl font-extrabold">
            Manage my events
          </h1>
          <Button variant="notFull">Create event</Button>
        </div>

        {events.length <= 0 ? (
          <EmptyState
            title="You dont have any event"
            subtitle="Please make a new event first"
            showReset={false}
            height="h-[calc(100vh-280px)]"
          />
        ) : (
          <>
            <div className="pt-12 lg:pt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
              {events.map((event: Event) => {
                return <EventListCard key={event.eventId} data={event} />;
              })}
            </div>
            <div className="flex items-center justify-center w-1/3 mx-auto gap-4 mt-24">
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
