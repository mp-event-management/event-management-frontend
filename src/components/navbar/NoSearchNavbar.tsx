import { FC } from "react";
import Container from "../Container";
import Logo from "./components/Logo";
import UserMenu from "./components/UserMenu";
import Categories from "./components/Categories";

const NoSearchNavbar: FC = () => {
  return (
    <header className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between lg:gap-0 md:gap-0">
            <Logo />
            <UserMenu />
          </div>
        </Container>
      </div>
      <Categories />
    </header>
  );
};

export default NoSearchNavbar;
