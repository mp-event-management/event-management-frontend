import EventForm from "@/components/form/EventForm";
import { FC } from "react";

const CreateEventPage: FC = () => {
  // TODO: this still harcoded, need to get from session login
  const userOrganizer = {
    id: 1,
    role: 2,
    name: "John Doe",
    email: "johndoe@example.com",
    password: "johndoehash",
  };

  return (
    <>
      <section className="w-full min-h-[calc(100vh-95px)] lg:max-w-xl lg:mx-auto lg:my-16 mt-6">
        <h1 className="text-2xl lg:text-4xl font-extrabold text-center">
          Create your event
        </h1>

        <div
          className="flex flex-col my-12 px-6
        "
        >
          <EventForm type="Create" organizerId={userOrganizer.id} />
        </div>
      </section>
    </>
  );
};

export default CreateEventPage;
