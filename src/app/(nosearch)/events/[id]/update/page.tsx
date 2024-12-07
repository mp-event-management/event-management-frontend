import getEventDetail from "@/app/actions/getEventDetails.actions";
import EventForm from "@/components/form/EventForm";
import { FC } from "react";

type UpdateEventPageProps = {
  params: { id: string };
};

const UpdateEventPage: FC<UpdateEventPageProps> = async ({ params }) => {
  const { id } = await params;

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

  const organizerId = organizer.userId;

  const event = await getEventDetail(id);
  console.log(event);

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
            event={event.data}
            eventId={event.data.eventId}
            organizerId={organizerId}
          />
        </div>
      </section>
    </>
  );
};

export default UpdateEventPage;
