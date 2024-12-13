"use server";

import { UpdateEvent } from "@/types/updateEvent";

type UpdateEventProps = {
  event: UpdateEvent;
  eventId: number;
};

export const updateEvent = async ({ event, eventId }: UpdateEventProps) => {
  const apiUrl = `${process.env.NEXT_PUBLIC_DEVELEOPMENT_URL}/api/v1/events/${eventId}`;

  try {
    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(event),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to update the event");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};
