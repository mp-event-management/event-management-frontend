"use client";

import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import EventListCard from "@/components/lists/EventListCard";
import { Event } from "@/types/getEvents";
import { Button } from "@/components/ui/Button";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { getAllEvents } from "../api/api";
import SkeletonEventCard from "@/components/loading/SkeletonEventCard";

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentPage, setCurrentpage] = useState(0);
  const [totalPage, setTotalPages] = useState(0);
  const { data: session } = useSession();
  const organizerId = session?.user.id;
  const role = session?.user.roles[0];

  const searchParams = useSearchParams();
  const category = searchParams.get("categoryId") || "";
  const city = searchParams.get("cityId") || "";

  // Default data per page
  const dataPerPage = 10;
  const query = searchParams.get("search")?.toString();

  const { data, isLoading } = useQuery({
    queryKey: ["events", currentPage, dataPerPage, query, category, city],
    queryFn: async () =>
      await getAllEvents(currentPage, dataPerPage, query, category, city),
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

  if (isLoading) {
    return (
      <Container>
        <div className="max-w-[2020px] mx-auto pt-[122px] lg:pt-[128px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
          {"abcdefghij".split("").map((i) => (
            <SkeletonEventCard key={i} />
          ))}
        </div>
      </Container>
    );
  }

  if (events?.length <= 0) {
    return <EmptyState height="h-[calc(100vh-90px)]" showReset={false} />;
  }

  return (
    <main>
      <Container>
        <div className="pt-[122px] lg:pt-[128px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
          {events?.map((event: Event) => {
            return (
              <EventListCard
                organizerId={organizerId}
                role={role}
                isShown={false}
                key={event.eventId}
                data={event}
              />
            );
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
    </main>
  );
}
