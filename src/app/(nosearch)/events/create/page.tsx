"use client";

import EventForm from "@/components/form/EventForm";
import { useSession } from "next-auth/react";
import { FC } from "react";

const CreateEventPage: FC = () => {
  const { data: session } = useSession();
  const organizerId = session?.user.id;

  console.log(session?.accessToken);
  return (
    <>
      <section className="w-full min-h-[calc(100vh-95px)] lg:max-w-xl lg:mx-auto lg:my-16 mt-6">
        <h1 className="text-2xl lg:text-4xl font-extrabold text-center">
          Create your new event
        </h1>

        <div
          className="flex flex-col my-12 px-6
        "
        >
          <EventForm
            type="Create"
            organizerId={Number(organizerId)}
            accessToken={session?.accessToken}
          />
        </div>
      </section>
    </>
  );
};

export default CreateEventPage;
