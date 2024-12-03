const getAllEvents = async (page: number = 0, size: number = 10) => {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DEVELEOPMENT_URL}/api/v1/events`
  );

  // Append pagination parameters
  url.searchParams.append("page", page.toString());
  url.searchParams.append("size", size.toString());

  console.log(url.toString());
  try {
    const response = await fetch(url.toString(), {
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
    // console.log("data from actions", data);
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch events. ${error}`);
  }
};

export default getAllEvents;
