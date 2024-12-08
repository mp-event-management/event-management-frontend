"use client";

import { FC, useEffect, useState } from "react";
import Container from "../Container";
import Logo from "./components/Logo";
import Search from "./components/Search";
import UserMenu from "./components/UserMenu";
import Categories from "./components/Categories";
import useDebounce from "@/hooks/useDebounce";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

const Navbar: FC = () => {
  const router = useRouter();
  const [onSearch, setOnSearch] = useState("");
  // const debouncedSearch = useDebounce(onSearch);
  const searchParams = useSearchParams();

  useEffect(() => {
    let newUrl = "";
    const delayDebounceFn = setTimeout(() => {
      if (onSearch) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "search",
          value: onSearch,
        });
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["search"],
        });
      }
      router.push(newUrl, { scroll: false });
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchParams, onSearch, router]);

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
