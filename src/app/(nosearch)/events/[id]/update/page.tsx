import EventForm from "@/components/form/EventForm";
import { FC } from "react";

const UpdateEventPage: FC = () => {
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
          <EventForm type="Update" />
        </div>
      </section>
    </>
  );
};

export default UpdateEventPage;
