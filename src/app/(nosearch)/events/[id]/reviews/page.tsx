"use client";

import { getAllEventReviews, getEventDetail } from "@/app/api/api";
import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import { Button } from "@/components/ui/Button";
import { EventReviews } from "@/types/eventReviews";
import { Event } from "@/types/getEvents";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

const EventReviewsPage = () => {
  const [reviews, setReviews] = useState<EventReviews[]>([]);
  const [event, setEvent] = useState<Event>();
  const [currentPage, setCurrentpage] = useState(0);
  const [totalPage, setTotalPages] = useState(0);

  const { id } = useParams();
  const { data: session } = useSession();
  const accessToken = session?.accessToken;

  // Set default data per page
  const dataPerPage = 10;

  const { data, isLoading } = useQuery({
    queryFn: async () => await getAllEventReviews(String(id), accessToken),
    queryKey: ["reviews", id, currentPage, dataPerPage],
  });

  const { data: eventDetails } = useQuery({
    queryFn: async () => await getEventDetail(String(id)),
    queryKey: ["eventDetails", id],
  });

  useEffect(() => {
    setReviews(data?.eventReviews);
    setEvent(eventDetails);
    setTotalPages(data?.totalPages);
  }, [data, reviews, eventDetails]);

  const handlePrevPage = () => {
    setCurrentpage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentpage((prevPage) => prevPage + 1);
  };

  return (
    <Container>
      <div className="flex flex-col gap-6 lg:mt-8 mt-2">
        <h1 className="text-3xl lg:text-4xl font-extrabold text-start">
          Rating and Reviews
        </h1>
        <h3 className="text-xl flex gap-4 items-center lg:text-2xl font-bold text-start">
          {event?.title}
          <p>-</p>
          {reviews?.length <= 0 ? (
            <p className="text-lg font-normal">No reviews</p>
          ) : (
            <p className="text-lg font-normal">{reviews?.length} reviews</p>
          )}
        </h3>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center text-lg font-bold text-rose-500 h-[calc(100vh-280px)] pt-14">
          Loading...
        </div>
      ) : reviews?.length <= 0 ? (
        <EmptyState
          title="No reviews for this event yet"
          subtitle="Please try again later"
          showReset={false}
          height="h-[calc(100vh-200px)]"
        />
      ) : (
        <section className="lg:min-h-[calc(100vh-300px)] flex flex-col justify-between">
          <div className="pt-12 lg:pt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
            {reviews?.map((review) => (
              <div
                key={review.eventReviewId}
                className="bg-slate-100 flex flex-col gap-3 px-6 py-4 rounded-xl"
              >
                <span className="flex items-center gap-2">
                  <FaStar size={24} className="text-yellow-400" />
                  <p className="text-xl font-bold">{review.rating}</p>
                </span>
                <p className="text-xl font-bold">{review.customerName}</p>
                <p className="text-lg text-green-700">{review.reviewText}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center w-1/3 mx-auto gap-4 mt-20">
            <Button
              disabled={currentPage === 0}
              onClick={() => handlePrevPage()}
            >
              Previous
            </Button>
            <Button
              disabled={currentPage === totalPage - 1}
              onClick={() => handleNextPage()}
            >
              Next
            </Button>
          </div>
        </section>
      )}
    </Container>
  );
};

export default EventReviewsPage;
