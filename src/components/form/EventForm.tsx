"use client";

import React, { FC, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/Button";
import { eventFormSchema } from "@/lib/validator";
import * as z from "zod";
import { eventDefaultValues } from "@/constant/eventDefaultValue";
import Dropdown from "./components/Dropdown";
import { Textarea } from "../ui/textarea";
import { CalendarClockIcon, TicketIcon } from "lucide-react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GrStatusInfo } from "react-icons/gr";
import { cities } from "@/constant/cities";
import { availableCategories } from "@/constant/categories";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoPricetagOutline } from "react-icons/io5";
import { Event } from "@/types/getEvents";
import { updateEvent } from "@/app/actions/updateEvent";
import { useToast } from "@/hooks/use-toast";
import { createNewEvent } from "@/app/api/api";
import { useUploadThing } from "@/utils/uploadthing";
import { FileUploader } from "../fileUploader/FileUploader";

type EventFormProps = {
  type: "Create" | "Update";
  event?: Event;
  organizerId: number | undefined;
  accessToken?: string | undefined;
  eventId?: number;
};

const EventForm: FC<EventFormProps> = ({
  type,
  event,
  organizerId,
  accessToken,
  eventId,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const router = useRouter();
  const { toast } = useToast();

  const initialValues =
    event && type === "Update"
      ? {
          ...event,
          categoryId: String(event.category.categoryId),
          eventImagesUrl: event.eventImagesUrl,
          startDate: new Date(event.startDate),
          endDate: new Date(event.endDate),
          ticketPrice: String(event.ticketPrice),
          totalTicket: String(event.totalTicket),
          eventStatus: String(event.eventStatus),
          cityId: String(event.city.cityId),
          address: event.address,
        }
      : eventDefaultValues;

  const { startUpload } = useUploadThing("imageUploader");

  // Define form.
  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues,
  });

  // Define submit handler.
  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    let uploadedEventImagesUrl = values.eventImagesUrl;

    if (files.length > 0) {
      console.log("Files : ", files);
      const uploadedImage = await startUpload(files);

      if (!uploadedImage) return;

      uploadedEventImagesUrl = uploadedImage[0].url;
      console.log("Uploaded event image : ", uploadedEventImagesUrl);
    }

    const ORGANIZER_ID = Number(organizerId);
    const eventImagesUrl = uploadedEventImagesUrl;
    const userOrganizerId = ORGANIZER_ID;
    const totalTicket = Number(values.totalTicket);
    const availableTicket = Number(values.totalTicket);
    const categoryId = Number(values.categoryId);
    const cityId = Number(values.cityId);
    const ticketPrice = Number(values.ticketPrice);

    if (type === "Create") {
      try {
        const newEvent = await createNewEvent(
          {
            ...values,
            userOrganizerId,
            categoryId,
            eventImagesUrl,
            ticketPrice,
            totalTicket,
            availableTicket,
            cityId,
          },
          accessToken
        );

        toast({ title: newEvent.message });

        if (newEvent) {
          form.reset();
          router.push(`/events/manage`);
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    }

    console.log("Values", values);

    if (type === "Update") {
      if (!eventId) {
        console.log("back");
        router.back();
        return;
      }

      try {
        const updatedEvent = await updateEvent({
          eventId,
          event: {
            ...values,
            availableTicket,
            categoryId,
            eventImagesUrl,
            cityId,
            ticketPrice,
            totalTicket,
          },
        });

        toast({ title: updatedEvent.message });

        if (updatedEvent) {
          form.reset();
          router.push(`/events/manage`);
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 text-[16px] font-bold"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Event title"
                    {...field}
                    className="bg-neutral-100 h-[54px] focus-visible:ring-offset-0 placeholder:text-grey-500 placeholder:text-[16px] rounded-full !text-[16px] px-4 py-3 border-none focus-visible:ring-transparent"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-64">
                  <Textarea
                    placeholder="Description"
                    {...field}
                    style={{
                      fontFamily: "monospace", // Optional, for tab-like spacing
                      whiteSpace: "pre-wrap", // Preserve newlines and spaces
                    }}
                    className="bg-neutral-100 flex flex-1 placeholder:text-grey-500 placeholder:text-[16px] !text-[16px] px-5 py-3 border-none rounded-2xl focus-visible:ring-transparent"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Dropdown
                    datas={availableCategories}
                    placeholder="Category"
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormDescription>
                  Make sure you choose the category
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="eventImagesUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <FileUploader
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormDescription>
                  Make sure the image size not larger than 8MB
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex items-center h-[54px] w-full overflow-hidden rounded-full bg-neutral-100 px-4 py-2">
                    <CalendarClockIcon size={18} />
                    <p className="ml-3 whitespace-nowrap text-[16px] mr-2 text-gray-500">
                      Start Date
                    </p>
                    <DatePicker
                      selected={field.value ? new Date(field.value) : null}
                      onChange={(date: Date | null) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel="Time :"
                      dateFormat="MM/dd/yyyy h:mm aa"
                      wrapperClassName="datePicker"
                      className="bg-neutral-100  placeholder:text-grey-500 placeholder:text-[16px] !text-[16px] border-none"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex items-center h-[54px] w-full overflow-hidden rounded-full bg-neutral-100 px-4 py-2">
                    <CalendarClockIcon size={18} />
                    <p className="ml-3 whitespace-nowrap text-gray-500 mr-2">
                      End Date
                    </p>
                    <DatePicker
                      selected={field.value ? new Date(field.value) : null}
                      onChange={(date: Date | null) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel="Time :"
                      dateFormat="MM/dd/yyyy h:mm aa"
                      wrapperClassName="datePicker"
                      className="bg-neutral-100  placeholder:text-grey-500 placeholder:text-[16px] !text-[16px] border-none"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="ticketPrice"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex items-center h-[54px] w-full overflow-hidden rounded-full bg-neutral-100 px-4 py-2">
                    <IoPricetagOutline size={18} />
                    <p className="ml-3 whitespace-nowrap text-gray-500">Rp</p>
                    <Input
                      type="number"
                      placeholder="Ticket price"
                      {...field}
                      className="bg-neutral-100 h-[54px] focus-visible:ring-offset-0 placeholder:text-grey-500 placeholder:text-[16px] rounded-full !text-[16px] px-4 py-3 border-none focus-visible:ring-transparent"
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  Leave it Rp 0 if you want the price to be FREE
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="totalTicket"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex items-center h-[54px] w-full overflow-hidden rounded-full bg-neutral-100 px-4 py-2">
                    <TicketIcon size={18} />
                    <p className="ml-3 whitespace-nowrap text-gray-500">
                      Total ticket
                    </p>
                    <Input
                      placeholder="Ticket price"
                      {...field}
                      className="bg-neutral-100 h-[54px] focus-visible:ring-offset-0 placeholder:text-grey-500 placeholder:text-[16px] rounded-full !text-[16px] px-4 py-3 border-none focus-visible:ring-transparent"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="eventStatus"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex items-center h-[54px] w-full overflow-hidden rounded-full bg-neutral-100 px-4 py-2">
                    <GrStatusInfo size={18} />
                    <p className="ml-3 whitespace-nowrap text-gray-500">
                      Event status
                    </p>
                    <Input
                      placeholder="UPCOMING"
                      {...field}
                      className="bg-neutral-100 h-[54px] focus-visible:ring-offset-0 placeholder:text-grey-500 placeholder:text-[16px] rounded-full !text-[16px] px-4 py-3 border-none focus-visible:ring-transparent"
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  Leave it by default is UPCOMING
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="cityId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Dropdown
                    datas={cities}
                    placeholder="City"
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-44">
                  <Textarea
                    placeholder="Where the event address"
                    {...field}
                    className="bg-neutral-100 flex flex-1 placeholder:text-grey-500 placeholder:text-[16px] !text-[16px] px-5 py-3 border-none rounded-2xl focus-visible:ring-transparent"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Submitting..." : `${type} Event`}
        </Button>
        <Button asChild variant={"ghost"}>
          <Link href="/events/manage">Cancel</Link>
        </Button>
      </form>
    </Form>
  );
};

export default EventForm;
