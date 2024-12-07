"use client";

import React, { FC, useTransition } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "./ui/Button";
import deleteEventById from "@/app/actions/deleteEventById";

type DeleteConfirmationProps = {
  eventId: number;
};

const DeleteConfirmation: FC<DeleteConfirmationProps> = ({ eventId }) => {
  const pathname = usePathname();
  let [isPending, startTransition] = useTransition();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Trash />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white">
        <AlertDialogHeader className="mb-10">
          <AlertDialogTitle className="text-xl font-bold">
            Are you sure you want to delete?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-lg">
            This will permanently delete this event
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={() =>
              startTransition(async () => {
                await deleteEventById(eventId);
              })
            }
            className="w-auto"
          >
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmation;
