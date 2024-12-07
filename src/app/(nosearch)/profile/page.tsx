import Container from "@/components/Container";
import { FC } from "react";

const ProfilePage: FC = () => {
  return (
    <section className="min-h-[calc(100vh-200px)]">
    <Container>
      <div className="flex items-center justify-between mt-8">
        <h1 className="text-3xl lg:text-4xl font-extrabold">
          My profile
        </h1>
      </div>

    </Container>
  </section>
  );
};

export default ProfilePage;
