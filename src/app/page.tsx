import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import getAllEvents from "./actions/getAllEvents";
import EventListCard from "@/components/events/EventListCard";
import { Event } from "@/types/GetEvents";

export default async function Home() {
  const events = await getAllEvents();

  if (events.length === 0) {
    return <EmptyState showReset />;
  }

  return (
    <Container>
      <div className="pt-32 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
        {events.map((event: Event, idx: number) => {
          return <EventListCard key={idx} data={event} />;
        })}
      </div>
    </Container>
  );
}
