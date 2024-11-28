import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import getAllEvents from "./actions/getAllEvents";
import EventListCard from "@/components/events/EventListCard";

export interface Category {
  categoryId: number;
  name: string;
  iconUrl: string;
}

export interface City {
  cityId: number;
  cityName: string;
}

export interface Event {
  eventId: number;
  userOrganizerId: number;
  title: string;
  description: string;
  category: Category;
  eventImagesUrl: string;
  startDate: string; // ISO format (e.g., "2024-12-01T09:00:00Z")
  endDate: string; // ISO format (e.g., "2024-12-01T17:00:00Z")
  ticketPrice: number; // Assuming it's a monetary value
  totalTicket: number;
  availableTicket: number;
  eventStatus: string; // Enum or string for event status
  city: City;
  address: string;
}

export default async function Home() {
  const events = await getAllEvents();

  if (events.length === 0) {
    return <EmptyState showReset />;
  }

  return (
    <main>
      <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {events.map((event: Event, idx: number) => {
            return (
              <EventListCard key={idx} data={event}/>
            );
          })}
        </div>
      </Container>
    </main>
  );
}
