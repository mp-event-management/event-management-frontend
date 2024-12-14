import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import React, { FC } from "react";

const page: FC = () => {
  const length = -10;

  return (
    <section className="min-h-[calc(100vh-200px)]">
      <Container>
        <div className="flex items-center justify-between mt-8">
          <h1 className="text-3xl lg:text-4xl font-extrabold">
            My dashboard
          </h1>
        </div>

        {length <= 0 ? (
          <EmptyState
            title="You dont have any data"
            subtitle="Please make some event"
            showReset={false}
            height="h-[calc(100vh-280px)]"
          />
        ) : (
          <>
            <p>You dont have any events</p>
          </>
        )}
      </Container>
    </section>
  );
};

export default page;
