import { Event } from "@/app/page";
import { FC } from "react";

interface EventListCardProps {
  data: Event;
}

const EventListCard: FC<EventListCardProps> = ({ data }) => {
  return (
    <div className="">
      <div>
        <p>{data.title}</p>
        <p>IDR {data.ticketPrice}</p>
        <p>
          {data.availableTicket} / {data.totalTicket}
        </p>
      </div>
    </div>
  );
};

export default EventListCard;
