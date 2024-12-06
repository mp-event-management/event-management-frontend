"use client";

import React, { FC } from "react";
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
import { GiPriceTag } from "react-icons/gi";
import { GrStatusInfo } from "react-icons/gr";
import { cities } from "@/constant/cities";
import { availableCategories } from "@/constant/categories";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createNewEvent } from "@/app/actions/createNewEvent.actions";

type EventFormProps = {
  organizerId: number;
  type: "create" | "update";
};

const EventForm: FC<EventFormProps> = ({ organizerId, type }) => {
  const initialValues = eventDefaultValues;
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues,
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    const ORGANIZER_ID = 1;

    const userOrganizerId = ORGANIZER_ID;
    const availableTicket = Number(values.totalTicket);
    const categoryId = Number(values.categoryId);
    const cityId = Number(values.cityId);
    const ticketPrice = Number(values.ticketPrice);
    const totalTicket = Number(values.totalTicket);

    if (type === "create") {
      try {
        const newEvent = await createNewEvent({
          event: {
            userOrganizerId,
            ...values,
            availableTicket,
            categoryId,
            cityId,
            ticketPrice,
            totalTicket,
          },
        });

        if (newEvent) {
          form.reset();
          router.push(`/`);
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    }

    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 text-[16px]"
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
                    className="bg-neutral-100 h-[54px] focus-visible:ring-offset-0 placeholder:text-grey-500 placeholder:text-[16px] rounded-full text-[16px] px-4 py-3 border-none focus-visible:ring-transparent"
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
                    className="bg-neutral-100 flex flex-1 placeholder:text-grey-500 placeholder:text-[16px] text-[16px] px-5 py-3 border-none rounded-2xl focus-visible:ring-transparent"
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
                <FormControl>
                  <Input
                    placeholder="Event Image url"
                    {...field}
                    className="bg-neutral-100 h-[54px] focus-visible:ring-offset-0 placeholder:text-grey-500 placeholder:text-[16px] rounded-full text-[16px] px-4 py-3 border-none focus-visible:ring-transparent"
                  />
                </FormControl>
                <FormDescription>Paste your event image link</FormDescription>
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
                      className="bg-neutral-100"
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
                      className="bg-neutral-100"
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
                    <GiPriceTag size={18} />
                    <p className="ml-3 whitespace-nowrap text-gray-500">Rp</p>
                    <Input
                      type="number"
                      placeholder="Ticket price"
                      {...field}
                      className="bg-neutral-100 h-[54px] focus-visible:ring-offset-0 placeholder:text-grey-500 placeholder:text-[16px] rounded-full text-[16px] px-4 py-3 border-none focus-visible:ring-transparent"
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
                      className="bg-neutral-100 h-[54px] focus-visible:ring-offset-0 placeholder:text-grey-500 placeholder:text-[16px] rounded-full text-[16px] px-4 py-3 border-none focus-visible:ring-transparent"
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
                      className="bg-neutral-100 h-[54px] focus-visible:ring-offset-0 placeholder:text-grey-500 placeholder:text-[16px] rounded-full text-[16px] px-4 py-3 border-none focus-visible:ring-transparent"
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
                    className="bg-neutral-100 flex flex-1 placeholder:text-grey-500 placeholder:text-[16px] text-[16px] px-5 py-3 border-none rounded-2xl focus-visible:ring-transparent"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">Create the event</Button>
        <Button asChild variant={"ghost"}>
          <Link href="/">Cancel</Link>
        </Button>
      </form>
    </Form>
  );
};

export default EventForm;
