"use client";

import { getEventDetail } from "@/app/api/api";
import EmptyState from "@/components/EmptyState";
import EventForm from "@/components/form/EventForm";
import { Event } from "@/types/getEvents";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

// TODO : this data still hardcoded, need to get from session
const organizer = {
  userId: 1,
  role: {
    roleId: 2,
    name: "ORGANIZER",
  },
  name: "John Doe",
  email: "johndoe@example.com",
  profilePictureUrl: "",
};

const UpdateEventPage = () => {
  const { id } = useParams();
  const organizerId = organizer.userId;

  const { data: event, isLoading } = useQuery({
    queryKey: ["event", id],
    queryFn: async () => await getEventDetail(id),
    enabled: !!id,
  });

  console.log("Param", id);
  console.log(event);
  console.log(event?.eventId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center text-lg font-bold text-rose-500 h-[calc(100vh-170px)] pt-14">
        Loading...
      </div>
    );
  }

  if (!event) {
    return (
      <EmptyState
        title="There is no event details"
        subtitle="Please try again later"
        showReset={false}
        height="h-[calc(100vh-280px)]"
      />
    );
  }

  return (
    <>
      <section className="w-full min-h-[calc(100vh-95px)] lg:max-w-xl lg:mx-auto lg:my-16 mt-6">
        <h1 className="text-2xl lg:text-4xl font-extrabold text-center">
          Update your event
        </h1>

        <div
          className="flex flex-col my-12 px-6
        "
        >
          <EventForm
            type="Update"
            event={event as Event}
            eventId={event?.eventId}
            organizerId={organizerId}
          />
        </div>
      </section>
    </>
  );
};

export default UpdateEventPage;
