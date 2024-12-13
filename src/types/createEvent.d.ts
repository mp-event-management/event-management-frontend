export type Event = {
  userOrganizerId: number;
  title: string;
  description: string;
  categoryId: number;
  eventImagesUrl: string;
  startDate: string | Date;
  endDate: string | Date;
  ticketPrice: number;
  totalTicket: number;
  availableTicket: number;
  cityId: number;
  address: string;
};
