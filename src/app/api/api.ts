import { CreateReview } from "@/types/createReview";
import { Transaction } from "@/types/createTransaction";
import { Event } from "@/types/createEvent";
import { PromoData } from "@/types/promoData";
import { RegisterData, RegisterResponse } from "@/types/registerData";

export const getEventsByOrganizeraId = async (
  organizerId: string | undefined,
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

export const getAllTicketsByCustomer = async (
  customerId: number | undefined,
  page: number = 0,
  size: number = 5,
  searchQuerry?: string
) => {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DEVELEOPMENT_URL}/api/v1/tickets/customer/${customerId}`
  );

  // Append pagination parameters
  url.searchParams.append("page", page.toString());
  url.searchParams.append("size", size.toString());

  // Append search params only if it exists
  if (searchQuerry) url.searchParams.append("search", searchQuerry.toString());

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

export const getAllEventReviews = async (
  eventId: number | string,
  accessToken: string | undefined
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DEVELEOPMENT_URL}/api/v1/reviews/event/${eventId}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      }
    );

    // Handle HTTP errors
    if (!response.ok) {
      const errorMessage = `Failed to fetch event reviews. HTTP ${response.status}: ${response.statusText}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    throw new Error(`Failed to fetch event reviews. ${error}`);
  }
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

export const getEventDetail = async (id: string | string[] | undefined) => {
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

export const getTransactionDetail = async (
  id: string | string[] | undefined
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DEVELEOPMENT_URL}/api/v1/transactions/${id}`,
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
      const errorMessage = `Failed to transaction details. HTTP ${response.status}: ${response.statusText}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    throw new Error(`Failed to fetch transaction details. ${error}`);
  }
};

export const createNewEvent = async (
  event: Event,
  accessToken: string | undefined
) => {
  const apiUrl = `${process.env.NEXT_PUBLIC_DEVELEOPMENT_URL}/api/v1/events`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
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

export const createReview = async (
  request: CreateReview,
  accessToken: string | undefined
) => {
  const apiUrl = `${process.env.NEXT_PUBLIC_DEVELEOPMENT_URL}/api/v1/reviews`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to sent the review");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const createTransaction = async (
  request: Transaction,
  accessToken: string | undefined
) => {
  const apiUrl = `${process.env.NEXT_PUBLIC_DEVELEOPMENT_URL}/api/v1/transactions`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed proccess the payment");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const createNewPromotion = async (promo: PromoData) => {
  const apiUrl = `${process.env.NEXT_PUBLIC_DEVELEOPMENT_URL}/api/v1/promotions`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(promo),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create new promotion");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const updatePromotion = async (promo: PromoData, promoId: string) => {
  const apiUrl = `${process.env.NEXT_PUBLIC_DEVELEOPMENT_URL}/api/v1/promotions/${promoId}`;

  try {
    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(promo),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to update the promotion");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (registerData: RegisterData) => {
  const apiUrl = `${process.env.NEXT_PUBLIC_DEVELEOPMENT_URL}/api/v1/users/register`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(registerData),
    });

    const responseData: RegisterResponse = await response.json();
    if (response.ok && responseData.success) {
      return responseData;
    } else {
      throw new Error(
        responseData.message || "Failed to register a new account"
      );
    }
  } catch (error) {
    throw error;
  }
};
