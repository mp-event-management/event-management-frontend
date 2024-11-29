import Container from "@/components/Container";
import { ApiResponse, Event } from "@/types/GetEvents";
import { FC } from "react";

const getEventDetail = async (id: string): Promise<ApiResponse<Event>> => {
  try {
    const data = await fetch(`http://localhost:8080/api/v1/events/${id}`);

    if (!data.ok) throw new Error("Failed to fetch event details");

    return await data.json();
  } catch (error) {
    console.log(error);
    throw new Error("error");
  }
};

type EventDetailProps = {
  params: {
    id: string;
  };
};

const EventDetailPage: FC<EventDetailProps> = async ({ params }) => {
  const { id } = await params;
  const { data }: ApiResponse<Event> = await getEventDetail(id);
  console.log(data);

  return (
    <Container>
      <div className="mt-10">
        <h1 className="font-bold text-2xl mb-5">{data.title}</h1>
        <h1 className="text-black">{data.category.name}</h1>
      </div>
    </Container>
  );
};

export default EventDetailPage;
