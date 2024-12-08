"use client";

import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import getAllEvents from "../actions/getAllEvents.actions";
import EventListCard from "@/components/lists/EventListCard";
import { Event } from "@/types/getEvents";
import { Button } from "@/components/ui/Button";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentPage, setCurrentpage] = useState(0);
  const [totalPage, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const category = searchParams.get("categoryId") || "";
  const city = searchParams.get("cityId") || "";

  const { data } = useSession();

  // TODO : this data still hardcoded, need to get from session
  const organizer = {
    userId: 1,
    role: {
      roleId: 2,
      name: "ORGANIZER",
    },
    name: "John Doe",
    email: "johndoe@example.com",
    profilepictureUrl: "",
  };

  useEffect(() => {
    console.log("home:", searchParams.get("search"));
    const dataPerPage = 10;

    const fetchEvents = async () => {
      setLoading(true);

      try {
        const query = searchParams.get("search")?.toString();
        const data = await getAllEvents(
          currentPage,
          dataPerPage,
          query,
          category,
          city
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

  if (events.length <= 0) {
    return <EmptyState height="h-[calc(100vh-90px)]" showReset={false} />;
  }

  return (
    <main>
      <Container>
        <div>
          {data?.user.roles.includes("ADMIN") ? (
            <div>Admin Dashboard</div>
          ) : (
            <div>Organizer Dashboard</div>
          )}
        </div>
        <div className="pt-[122px] lg:pt-[128px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
          {events.map((event: Event) => {
            return (
              <EventListCard
                isShown={false}
                organizer={organizer}
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
