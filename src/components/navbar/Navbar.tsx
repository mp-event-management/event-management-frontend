"use client";

import { FC, useState } from "react";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import Categories from "./Categories";

const Navbar: FC = () => {
  const [onSearch, setOnSearch] = useState("");
  console.log(onSearch);

  return (
    <nav className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search onSearch={setOnSearch} />
            <UserMenu />
          </div>
        </Container>
      </div>
      <Categories />
    </nav>
  );
};

export default Navbar;
