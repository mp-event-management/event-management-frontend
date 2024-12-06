import * as z from "zod";

export const eventFormSchema = z.object({
  title: z
    .string()
    .min(10, "Title must be at least 10 characters")
    .max(255, "Title must be less than 255 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(600, "Description must be less than 600 characters"),
  categoryId: z.string().min(1, "Category id must be at least 1 digit"),
  eventImagesUrl: z
    .string()
    .min(10, "Event image url must be at least 10 characters")
    .max(600, "Event image url must be less than 255 characters"),
  startDate: z.date(),
  endDate: z.date(),
  ticketPrice: z
    .string()
    .min(0, { message: "Ticket price must be at least 0" }),
  totalTicket: z.string().min(1, "Total ticket must be at least 1"),
  eventStatus: z
    .string()
    .min(5, "Event status must be at least 10 characters")
    .max(100, "Event status must be less than 100 characters"),
  cityId: z.string().min(1, "City id must be at least 1 digit"),
  address: z
    .string()
    .min(10, "Address must be at least 10 characters")
    .max(600, "Address must be less than 255 characters"),
});
