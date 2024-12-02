"use client";

import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import getAllEvents from "./actions/getAllEvents";
import EventListCard from "@/components/events/EventListCard";
import { Event } from "@/types/GetEvents";
import { Button } from "@/components/ui/Button";
import { useEffect, useState } from "react";

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentPage, setCurrentpage] = useState(0);
  const [totalPage, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const dataPerPage = 10;

    const fetchEvents = async () => {
      setLoading(true);

      try {
        const data = await getAllEvents(currentPage, dataPerPage);

        // Check if the data structured as expected
        if (!data || !data.data || !data.data.events) {
          throw new Error("Unexpected API response structure");
        }

        setEvents(data.data.events);
        setTotalPages(data.data.totalPages);
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch the events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [currentPage]);

  // const events = await getAllEvents();

  console.log("total page", totalPage);
  console.log("current page", currentPage);
  // console.log("Events homepage", events);
  // console.log("Events totalPage homepage", events);

  const handlePrevPage = () => {
    setCurrentpage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentpage((prevPage) => prevPage + 1);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center text-lg font-bold text-rose-500 h-screen">
        Loading...
      </div>
    );
  }

  if (events.length === 0) {
    return <EmptyState showReset={false} />;
  }

  return (
    <Container>
      <div className="pt-[116px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
        {events.map((event: Event, idx: number) => {
          return <EventListCard key={idx} data={event} />;
        })}
      </div>
      <div className="flex items-center w-full gap-4 mt-20">
        <Button disabled={currentPage === 0} onClick={() => handlePrevPage()}>
          Previous
        </Button>
        <Button
          disabled={currentPage === totalPage - 1}
          onClick={() => handleNextPage()}
        >
          Next
        </Button>
      </div>
    </Container>
  );
}
