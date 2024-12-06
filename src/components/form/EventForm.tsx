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
  FormLabel,
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
import { IoPricetag, IoPricetagOutline } from "react-icons/io5";
import { GiPriceTag } from "react-icons/gi";
import { GrStatusInfo } from "react-icons/gr";

type EventFormProps = {
  organizerId: number;
  type: "create" | "update";
};

const EventForm: FC<EventFormProps> = ({ organizerId, type }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const initialValues = eventDefaultValues;

  // 1. Define your form.
  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues,
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof eventFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
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
                    placeholder="Event title"
                    {...field}
                    className="bg-neutral-100 h-[54px] focus-visible:ring-offset-0 placeholder:text-grey-500 rounded-full text-[16px] px-4 py-3 border-none focus-visible:ring-transparent"
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
                    className="bg-neutral-100 flex flex-1 placeholder:text-grey-500 text-[16px] px-5 py-3 border-none rounded-2xl focus-visible:ring-transparent"
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
            name="eventImageUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Paste your image url"
                    {...field}
                    className="bg-neutral-100 h-[54px] focus-visible:ring-offset-0 placeholder:text-grey-500 rounded-full text-[16px] px-4 py-3 border-none focus-visible:ring-transparent"
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
            name="startDate"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex items-center h-[54px] w-full overflow-hidden rounded-full bg-neutral-100 px-4 py-2">
                    <CalendarClockIcon size={18} />
                    <p className="ml-3 whitespace-nowrap text-gray-600 mr-2">
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
                    <p className="ml-3 whitespace-nowrap text-gray-600 mr-2">
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
                    <p className="ml-3 whitespace-nowrap text-gray-600">Rp</p>
                    <Input
                      type="number"
                      placeholder="Ticket price"
                      {...field}
                      className="bg-neutral-100 h-[54px] focus-visible:ring-offset-0 placeholder:text-grey-500 rounded-full text-[16px] px-4 py-3 border-none focus-visible:ring-transparent"
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
            name="totalTicket"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex items-center h-[54px] w-full overflow-hidden rounded-full bg-neutral-100 px-4 py-2">
                    <TicketIcon size={18} />
                    <p className="ml-3 whitespace-nowrap text-gray-600">
                      Total ticket
                    </p>
                    <Input
                      type="number"
                      placeholder="Ticket price"
                      {...field}
                      className="bg-neutral-100 h-[54px] focus-visible:ring-offset-0 placeholder:text-grey-500 rounded-full text-[16px] px-4 py-3 border-none focus-visible:ring-transparent"
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
                    <p className="ml-3 whitespace-nowrap text-gray-600">
                      Event status
                    </p>
                    <Input
                      placeholder="UPCOMING"
                      {...field}
                      className="bg-neutral-100 h-[54px] focus-visible:ring-offset-0 placeholder:text-grey-500 rounded-full text-[16px] px-4 py-3 border-none focus-visible:ring-transparent"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default EventForm;
