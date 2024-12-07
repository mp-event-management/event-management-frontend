const deleteEventById = async (eventId: number ) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DEVELEOPMENT_URL}/api/v1/events/${eventId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    // Handle HTTP errors
    if (!response.ok) {
      const errorMessage = `Failed to delete the event. HTTP ${response.status}: ${response.statusText}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to delete the event. ${error}`);
  }
};

export default deleteEventById;
