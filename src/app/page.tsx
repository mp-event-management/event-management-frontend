"use client";

import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import getAllEvents from "./actions/getAllEvents";
import EventListCard from "@/components/events/EventListCard";
import { Event } from "@/types/getEvents";
import { Button } from "@/components/ui/Button";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentPage, setCurrentpage] = useState(0);
  const [totalPage, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    console.log("home:", searchParams.get("search"));
    const dataPerPage = 10;

    const fetchEvents = async () => {
      setLoading(true);

      try {
        const params = searchParams.get("search")?.toString();
        const data = await getAllEvents(currentPage, dataPerPage, params);

        // Check if the data structured as expected
        if (!data || !data.data || !data.data.events) {
          throw new Error("Unexpected API response structure");
        }

        setEvents(data.data.events);
        setTotalPages(data.data.totalPages);
      } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch the events lists");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [currentPage, searchParams]);

  console.log(events);

  const handlePrevPage = () => {
    setCurrentpage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentpage((prevPage) => prevPage + 1);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center text-lg font-bold text-rose-500 h-[calc(100vh-180px)]">
        Loading...
      </div>
    );
  }

  if (events.length === 0) {
    return <EmptyState showReset={false} />;
  }

  return (
    <Container>
      <div className="pt-[122px] lg:pt-[128px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
        {events.map((event: Event) => {
          return <EventListCard key={event.eventId} data={event} />;
        })}
      </div>
      <div className="flex items-center justify-center w-1/3 mx-auto gap-4 mt-24">
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
