export type ApiResponse<T> = {
  statusCode: number;
  message: string;
  success: boolean;
  data: T; // The `data` field contains the actual object
};

export type Event = {
  eventId: number;
  userOrganizer: UserOrganizer;
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

export type UserOrganizer = {
  userId: number;
  role: Role;
  name: string;
  email: string;
  profilepictureUrl: string;
};

export type Role = {
  roleId: number;
  name: string;
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
