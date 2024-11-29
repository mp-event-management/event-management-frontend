export type ApiResponse<T> = {
  statusCode: number;
  message: string;
  success: boolean;
  data: T; // The `data` field contains the actual object
};

export type Event = {
  eventId: number;
  userOrganizerId: number;
  title: string;
  description: string;
  category: Category;
  eventImagesUrl: string;
  startDate: string; // ISO 8601 date string
  endDate: string; // ISO 8601 date string
  ticketPrice: number;
  totalTicket: number;
  availableTicket: number;
  eventStatus: string;
  city: City;
  address: string;
};

export type Category = {
  categoryId: number;
  name: string;
  iconUrl: string;
};

export type City = {
  cityId: number;
  cityName: string;
};
