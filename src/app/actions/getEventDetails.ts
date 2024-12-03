import { ApiResponse, Event } from "@/types/getEvents";

// export const getEventDetail = async (
//   id: string
// ): Promise<ApiResponse<Event>> => {
//   try {
//     const data = await fetch(
//       `${process.env.NEXT_PUBLIC_DEVELEOPMENT_URL}/api/v1/events/${id}`
//     );

//     if (!data.ok) throw new Error("Failed to fetch event details");

//     return await data.json();
//   } catch (error) {
//     console.log(error);
//     throw new Error("error");
//   }
// };

const getEventDetail = async (id: string) => {
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
      const errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch events. ${error}`);
  }
};

export default getEventDetail;
