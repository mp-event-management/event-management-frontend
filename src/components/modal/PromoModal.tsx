"use client";

import React, { FC, useState } from "react";
import { Button } from "../ui/Button";
import { Modal } from "flowbite-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { PromoData } from "@/types/promoData";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { promoDefaultValue } from "@/constant/promoDefaultValue";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { promoFormSchema } from "@/lib/validator";
import { z } from "zod";
import { createNewPromotion } from "@/app/api/api";
import { Input } from "../ui/input";
import { CalendarClockIcon } from "lucide-react";
import { promotionsTypes } from "@/constant/promotionType";
import Dropdown from "./components/Dropdown";
import { cn } from "@/lib/utils";
import { MdDiscount } from "react-icons/md";
import DatePicker from "react-datepicker";

type PromoModalProps = {
  eventId?: number;
};

const PromoModal: FC<PromoModalProps> = ({ eventId }) => {
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const initialValues = promoDefaultValue;

  // Define form.
  const form = useForm<z.infer<typeof promoFormSchema>>({
    resolver: zodResolver(promoFormSchema),
    defaultValues: initialValues,
  });

  // Watch promotionType to conditionally enable / disable fields
  const promotionType = form.watch("promotionType");

  // Define submit handler.
  async function onSubmit(values: z.infer<typeof promoFormSchema>) {
    const event = Number(eventId);
    const discountPercentage = Number(values.discountPercentage / 100);

    const payload: PromoData = {
      event: { eventId: event },
      ...values,
      discountPercentage,
    };

    if (promotionType !== "VOUCHER") {
      delete payload.availableUses;
    }

    console.log("Values", payload);

    try {
      const newPromo = await createNewPromotion(payload);

      toast({ title: newPromo.message });

      if (newPromo) {
        form.reset();
        router.push(`/events/manage`);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  return (
    <>
      <Button onClick={() => setOpenModal(true)} variant="notFull" size="sm">
        <MdDiscount />
        Add Promo
      </Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>
          <p className="text-xl font-bold text-center">Add promo</p>
        </Modal.Header>
        <Modal.Body className="overflow-visible">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6 text-[16px] font-bold"
            >
              {/* Dropdown for promotion type */}
              <div className="flex flex-col gap-5 md:flex-row">
                <FormField
                  control={form.control}
                  name="promotionType"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Promo type</FormLabel>
                      <FormControl>
                        <Dropdown
                          datas={promotionsTypes}
                          placeholder="Promo Type"
                          onChangeHandler={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Input for promotion code */}
              <div className="flex flex-col gap-5 md:flex-row">
                <FormField
                  control={form.control}
                  name="promotionCode"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Promo code</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="E.q. PROMO20%"
                          {...field}
                          className="bg-neutral-100 h-[54px] focus-visible:ring-offset-0 placeholder:text-grey-500 placeholder:text-[16px] rounded-full !text-[16px] px-4 py-3 border-none focus-visible:ring-transparent"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Input for discount percentage */}
              <div className="flex flex-col gap-5 md:flex-row">
                <FormField
                  control={form.control}
                  name="discountPercentage"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Discount percentage %</FormLabel>
                      <FormControl>
                        <div className="flex items-center h-[54px] w-full overflow-hidden rounded-full bg-neutral-100 px-4 py-2">
                          <Input
                            type="number"
                            placeholder="Discount percentage"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                            className="bg-neutral-100 h-[54px] focus-visible:ring-offset-0 placeholder:text-grey-500 placeholder:text-[16px] rounded-full !text-[16px] px-4 py-3 border-none focus-visible:ring-transparent"
                          />
                          <p className="rl-3 whitespace-nowrap text-gray-500">
                            %
                          </p>
                        </div>
                      </FormControl>
                      <FormDescription>Range 1 - 100</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="availableUses"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>How many times can be use</FormLabel>
                      <FormControl>
                        <div className="flex items-center h-[54px] w-full overflow-hidden rounded-full bg-neutral-100 px-4 py-2">
                          <Input
                            type="number"
                            placeholder="Available uses"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                            disabled={promotionType !== "VOUCHER"}
                            className={cn(
                              "bg-neutral-100 h-[54px] focus-visible:ring-offset-0 placeholder:text-grey-500 placeholder:text-[16px] rounded-full !text-[16px] px-4 py-3 border-none focus-visible:ring-transparent",
                              {
                                "opacity-40": promotionType !== "VOUCHER",
                              }
                            )}
                          />
                          <p className="rl-3 whitespace-nowrap text-gray-500">
                            Uses
                          </p>
                        </div>
                      </FormControl>
                      <FormDescription>
                        {promotionType === "VOUCHER"
                          ? "How many times voucher can be used."
                          : "Availalbe for VOUCHER type."}
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
                            selected={
                              field.value ? new Date(field.value) : null
                            }
                            onChange={(date: Date | null) =>
                              field.onChange(date)
                            }
                            showTimeSelect
                            timeInputLabel="Time :"
                            dateFormat="MM/dd/yyyy h:mm aa"
                            wrapperClassName="datePicker"
                            className="bg-neutral-100  placeholder:text-grey-500 placeholder:text-[16px] !text-[16px] border-none !z-[100]"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col gap-5 md:flex-row relative">
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
                            selected={
                              field.value ? new Date(field.value) : null
                            }
                            onChange={(date: Date | null) =>
                              field.onChange(date)
                            }
                            showTimeSelect
                            timeInputLabel="Time :"
                            dateFormat="MM/dd/yyyy h:mm aa"
                            wrapperClassName="datePicker"
                            className="bg-neutral-100  placeholder:text-grey-500 placeholder:text-[16px] !text-[16px] border-none !z-[100]"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit button */}
              <div className="flex flex-col w-full mt-4 gap-4">
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting
                    ? "Submitting..."
                    : `Create Promo`}
                </Button>
                <Button
                  onClick={() => {
                    setOpenModal(false);
                    form.reset();
                  }}
                  variant={"ghost"}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PromoModal;
