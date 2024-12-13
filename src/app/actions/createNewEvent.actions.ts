"use server";

import { Event } from "@/types/createEvent";

type CreateNewEventProps = {
  event: Event;
};

export const createNewEvent = async ({ event }: CreateNewEventProps) => {
  const apiUrl = `${process.env.NEXT_PUBLIC_DEVELEOPMENT_URL}/api/v1/events`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(event),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create new event");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};
