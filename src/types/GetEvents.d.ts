export type ApiResponse<T> = {
  statusCode: number;
  message: string;
  success: boolean;
  data: T; // The data field contains the actual object
};

export type Event = {
  eventId: number;
  userOrganizer: UserOrganizer;
  title: string;
  description: string;
  category: Category;
  eventImagesUrl: string;
  startDate: Date; // ISO 8601 date string
  endDate: Date; // ISO 8601 date string
  ticketPrice: number;
  totalTicket: number;
  availableTicket: number;
  eventStatus: string;
  city: City;
  address: string;
  promotions: Promotions[];
};

export type Promotions = {
  promotionId: number;
  promotionType: string;
  promotionCode: string;
  discountPercentage: number;
  availableUses: number;
  startDate: Date;
  endDate: Date;
};

export type UserOrganizer = {
  userId: number;
  role: Role;
  name: string;
  email: string;
  profilepictureUrl: string;
};

export type UserCustomer = {
  id: number;
  role: number;
  name: string;
  email: string;
  password: string;
  referralCode: string;
  isFirstTimeDiscount: boolean;
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
