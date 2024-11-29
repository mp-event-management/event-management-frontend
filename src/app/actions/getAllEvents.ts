const getAllEvents = async () => {
  try {
    const response = await fetch("http://localhost:8080/api/v1/events", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    // Handle HTTP errors
    if (!response.ok) {
      const errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data.data.events;
  } catch (error) {
    throw new Error(`Failed to fetch events. ${error}`);
  }
};

export default getAllEvents;
