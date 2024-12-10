import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import { Button } from "@/components/ui/Button";
import { FC } from "react";

const MyEventsPage: FC = () => {
  const length = 1;

  return (
    <section className="min-h-[calc(100vh-200px)]">
      <Container>
        <div className="flex items-center justify-between mt-8">
          <h1 className="text-3xl lg:text-4xl font-extrabold">
            My ticket lists
          </h1>
        </div>

        {length <= 0 ? (
          <EmptyState
            title="You dont have any tickets"
            subtitle="Please get a ticket first"
            showReset={false}
            height="h-[calc(100vh-280px)]"
          />
        ) : (
          <>
            {/* <div className="pt-12 lg:pt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
              {events.data.events?.map((event: Event) => {
                return (
                  <EventListCard
                    isShown={true}
                    organizer={organizer}
                    key={event.eventId}
                    data={event}
                  />
                );
              })}
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
            </div> */}
          </>
        )}
      </Container>
    </section>
  );
};

export default MyEventsPage;
