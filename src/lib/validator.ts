import * as z from "zod";

export const eventFormSchema = z.object({
  title: z
    .string()
    .min(10, "Title must be at least 10 characters")
    .max(255, "Title must be less than 255 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(2000, "Description must be less than 2000 characters"),
  categoryId: z.string().min(1, "Select category for your event"),
  eventImagesUrl: z
    .string()
    .url()
    .min(10, "Event image url must be at least 10 characters")
    .max(600, "Event image url must be less than 600 characters"),
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
  cityId: z.string().min(1, "Select city for your event location"),
  address: z
    .string()
    .min(10, "Address must be at least 10 characters")
    .max(800, "Address must be less than 255 characters"),
});

export const promoFormSchema = z
  .object({
    promotionType: z.string().min(1, "Select promotion type"),
    promotionCode: z
      .string()
      .min(6, "Promotion code must be at least 6 characters")
      .max(20, "Promotion code must be less than 20 characters"),
    discountPercentage: z
      .number()
      .min(1, { message: "Discount percentage must be at least 1" })
      .max(100, { message: "Discount percentage must not exceed 100" }),
    availableUses: z.number().optional(),
    startDate: z.date(),
    endDate: z.date(),
  })
  .refine(
    (data) =>
      data.promotionType !== "VOUCHER" ||
      data.availableUses === undefined ||
      data.availableUses > 0,
    {
      path: ["availableUses"],
      message: "Available uses must be at least 1",
    }
  )
  .superRefine((data, ctx) => {
    const { eventStartDate, eventEndDate } = ctx || {};

    if (!eventStartDate || !eventEndDate) {
      return true;
    }

    // Promo start date must be >= event start date
    if (data.startDate < eventStartDate) {
      ctx.addIssue({
        path: ["startDate"],
        message: "Promo start date must be on or after the event start date",
        code: z.ZodIssueCode.custom,
      });
    }

    // Promo start date must be < event end date
    if (data.startDate > eventEndDate) {
      ctx.addIssue({
        path: ["startDate"],
        message: "Promo start date must be set before the event end date",
        code: z.ZodIssueCode.custom,
      });
    }

    // Promo end date must be <= event end date
    if (data.endDate > eventEndDate) {
      ctx.addIssue({
        path: ["endDate"],
        message: "Promo end date must be on or before the event end date",
        code: z.ZodIssueCode.custom,
      });
    }

    // Validate that startDate is less than endDate
    if (data.startDate >= data.endDate) {
      ctx.addIssue({
        path: ["endDate"],
        message: "Promo end date must be after promo start date",
        code: z.ZodIssueCode.custom,
      });
    }
  });
