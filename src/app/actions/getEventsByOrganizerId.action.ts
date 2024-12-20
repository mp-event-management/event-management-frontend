"use server";

const getEventsByOrganizeraId = async (
  organizerId: number,
  page: number = 0,
  size: number = 5,
  searchQuerry?: string
) => {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DEVELEOPMENT_URL}/api/v1/events/organizer/${organizerId}`
  );

  // Append pagination parameters
  url.searchParams.append("page", page.toString());
  url.searchParams.append("size", size.toString());

  // Append search params only if it exists
  if (searchQuerry) {
    url.searchParams.append("search", searchQuerry.toString());
  }

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

export default getEventsByOrganizeraId;
