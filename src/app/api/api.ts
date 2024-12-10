export const getEventsByOrganizeraId = async (
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
  if (searchQuerry) url.searchParams.append("search", searchQuerry.toString());

  console.log(url.toString());

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  // Handle HTTP errors
  if (!response.ok) {
    const errorMessage = `HTTP ${response.status}: ${response.statusText}`;
    throw new Error(errorMessage);
  }

  const data = await response.json();
  return data;
};

export const getAllEvents = async (
  page: number = 0,
  size: number = 10,
  searchQuerry?: string,
  category?: string,
  city?: string
) => {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DEVELEOPMENT_URL}/api/v1/events`
  );

  // Append search params only if it exists
  if (searchQuerry?.trim()) url.searchParams.append("search", searchQuerry);
  // Append category params only if it exists
  if (category?.trim()) url.searchParams.append("categoryId", category);
  // Append city params only if it exists
  if (city?.trim()) url.searchParams.append("cityId", city);
  // Append pagination parameters
  url.searchParams.append("page", page.toString());
  url.searchParams.append("size", size.toString());

  console.log(url.toString());

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  // Handle HTTP errors
  if (!response.ok) {
    const errorMessage = `HTTP ${response.status}: ${response.statusText}`;
    throw new Error(errorMessage);
  }

  const data = await response.json();
  return data;
};

export const getEventDetail = async (
  id: string | string[] | undefined
)  => {
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
    return data.data;
  } catch (error) {
    throw new Error(`Failed to fetch event details. ${error}`);
  }
};

export const deleteEventById = async (eventId: number) => {
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
