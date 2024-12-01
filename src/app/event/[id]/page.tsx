import { Button } from "@/components/ui/Button";
import { ApiResponse, Event } from "@/types/GetEvents";
import { CalendarCheck2, MapPinned } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { IoArrowBack } from "react-icons/io5";

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
      {/* Arrow back */}
      <div className="flex lg:flex-row flex-col lg:items-center items-start lg:gap-6 gap-4 mt-2 lg:mb-6 md:mb-5 mb-4">
        <Link
          href="/"
          className="lg:hover:bg-neutral-100 lg:rounded-full lg:p-4 rounded-full transition"
        >
          <IoArrowBack size={24} />
        </Link>
      </div>

      {/* Event hero image */}
      <div className="aspect-square w-full mb-10 h-[300px] md:h-[540px] relative overflow-hidden rounded-xl transition">
        <Image
          fill
          alt="Event"
          src="https://placehold.co/600x600"
          className="object-cover h-full w-full group-hover:scale-110 transition"
        />
      </div>

      {/* Detail and Purchase */}
      <div className="flex flex-row justify-between gap-14">
        {/* Details side */}
        <div className="flex flex-col">
          <div className="text-[16px] font-bold mb-2 flex flex-row gap-2 items-center">
            <p>{data.startDate},</p>
            <span>{data.city.cityName}</span>
          </div>
          <h1 className="font-extrabold lg:text-5xl md:text-4xl text-3xl">
            {data.title}
          </h1>
          <p className="text-xl text-muted-foreground my-8">
            {data.description}
          </p>

          {/* Organized by */}
          <div className="flex flex-row items-center gap-4 w-full bg-[#F8F7FA] p-8 rounded-2xl">
            <div className="relative h-12 w-12 rounded-full">
              <Image
                fill
                alt="Organizer"
                src="https://placehold.co/30x30"
                className="object-cover h-full w-full rounded-full"
              />
            </div>
            <div className="flex flex-row items-center gap-2 text-lg font-normal">
              <p className="text-[16px]">Organized by</p>
              <span className="font-bold">{data.userOrganizer.name}</span>
            </div>
          </div>

          {/* Date and time */}
          <div className="flex flex-col gap-3 my-9">
            <h3 className="text-[24px] font-extrabold">Date and time</h3>
            <p className="flex flex-row gap-4 items-center text-[16px] font-semibold">
              <CalendarCheck2 size={18} />
              <span>
                {data.startDate} - {data.endDate}
              </span>
            </p>
          </div>

          {/* Location */}
          <div className="flex flex-col gap-3 my-9">
            <h3 className="text-[24px] font-extrabold">Location</h3>
            <p className="flex flex-row gap-4 items-center text-[16px] font-semibold">
              <MapPinned size={18} />
              <span>
                {data.address}, {data.city.cityName}
              </span>
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-col gap-3 my-9">
            <h3 className="text-[24px] font-extrabold">Tags</h3>
            <p className="text-[14px] py-4 px-6 rounded-full font-bold bg-[#F8F7FA]">
              {data.category.name}
            </p>
          </div>
        </div>

        {/* Purchase and payment side */}
        <div className="flex flex-col items-center border-[1px] rounded-xl p-8 w-[340px] min-h-[200px] max-h-[220px]">
          <p className="flex gap-2 items-center text-[24px] font-bold">
            Rp{data.ticketPrice}
            <span className="font-normal text-neutral-800">per ticket</span>
          </p>
          <Button color="primary">Get tickets</Button>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
