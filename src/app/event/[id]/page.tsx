import { ApiResponse, Event } from "@/types/GetEvents";
import Image from "next/image";
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
  const { id } = params;
  const { data }: ApiResponse<Event> = await getEventDetail(id);
  console.log(data);

  return (
    <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[70%] 2xl:w-[60%] mx-auto lg:mt-6 md:mt-4 sm:mt-2 px-[24px] transition">
      <h1 className="font-extrabold text-2xl md:text-3xl lg:text-4xl mb-5">
        {data.title}
      </h1>
      <div className="aspect-square w-full mb-8 h-[300px] md:h-[600px] relative overflow-hidden rounded-xl transition">
        <Image
          fill
          alt="Event"
          src="https://placehold.co/600x600"
          className="object-cover h-full w-full group-hover:scale-110 transition"
        />
      </div>
      <div className="text-lg font-bold flex flex-row gap-2 items-center">
        <p>
          <span className="text-neutral-400">start</span> {data.startDate} -{" "}
          <span className="text-neutral-400">end</span> {data.endDate},
        </p>
        <span>{data.city.cityName}</span>
      </div>
      <p className="text-xl text-muted-foreground">{data.description}</p>
    </div>
  );
};

export default EventDetailPage;
