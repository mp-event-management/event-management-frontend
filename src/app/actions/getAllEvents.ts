const getAllEvents = async () => {
  try {
    const response = await fetch("http://localhost:8080/api/v1/events", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) throw new Error("Error fetching events");

    const data = await response.json();
    return data.data.events;
  } catch (error) {
    throw error;
  }
};

export default getAllEvents;
