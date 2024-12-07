"use client";

import { FC, useEffect, useState } from "react";
import Container from "../Container";
import Logo from "./components/Logo";
import Search from "./components/Search";
import UserMenu from "./components/UserMenu";
import Categories from "./components/Categories";
import useDebounce from "@/hooks/useDebounce";
import { useRouter, useSearchParams } from "next/navigation";

const Navbar: FC = () => {
  const router = useRouter();
  const [onSearch, setOnSearch] = useState<string>("");
  const debouncedSearch = useDebounce(onSearch);

  // const [selectedCategory, setSelectedCategory] = useState<string>("");
  const searchParams = useSearchParams();
  // console.log("search : ", onSearch);

  useEffect(() => {
    // native way
    // window.history.pushState(null, "", `?search=${debouncedSearch}`);

    // nextjs way
    router.push(`?search=${debouncedSearch}`, {
      scroll: false,
    });

    //   // native way to read url
    //   // window.location.search
  }, [debouncedSearch, router]);

  console.log(searchParams.get("onSearch"));

  return (
    <header className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between lg:gap-0 md:gap-0">
            <Logo />
            <Search onSearch={setOnSearch} />
            <UserMenu />
          </div>
        </Container>
      </div>
      <Categories />
    </header>
  );
};

export default Navbar;
