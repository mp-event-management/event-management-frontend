"use server"
import { ApiResponse, Event } from "@/types/getEvents";

const getEventDetail = async (id: string): Promise<ApiResponse<Event>> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DEVELEOPMENT_URL}/api/v1/events/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    // Handle HTTP errors
    if (!response.ok) {
      const errorMessage = `Failed to fetch event details. HTTP ${response.status}: ${response.statusText}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch event details. ${error}`);
  }
};

export default getEventDetail;
