"use client";

import React, { FC, useState, useTransition } from "react";
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
import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/Button";
import { deleteEventById } from "@/app/api/api";
import { useToast } from "@/hooks/use-toast";

type DeleteConfirmationProps = {
  eventId: number;
};

const DeleteConfirmation: FC<DeleteConfirmationProps> = ({ eventId }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const response = await deleteEventById(eventId);
      toast({
        title: response.message,
        description: `Successful delete event with id ${eventId}`,
      });
      startTransition(() => {
        router.push("/events/manage");
      });
    } catch (error) {
      if (error instanceof Error) throw new Error(`${error.message}`);
      else throw new Error("An unknown error occurred");
    } finally {
      setIsDeleting(false);
      router.refresh();
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Trash2Icon />
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
            onClick={handleDelete}
            disabled={isPending || isDeleting}
            className="w-auto"
          >
            {isPending || isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmation;
