import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import { FC } from "react";

const MyEventsPage: FC = () => {
  const length = -1;

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
            <p>YOu dont have any tickets</p>
          </>
        )}
      </Container>
    </section>
  );
};

export default MyEventsPage;
