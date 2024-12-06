import { number } from "zod";

export const eventDefaultValues = {
  userOrganizerId: 1,
  title: "",
  description: "",
  categoryId: 1,
  eventImageUrl: "",
  startDate: new Date(),
  endDate: new Date(),
  ticketPrice: 0,
  totalTicket: 1,
  eventStatus: "UPCOMING",
  cityId: 1,
  address: "",
};
