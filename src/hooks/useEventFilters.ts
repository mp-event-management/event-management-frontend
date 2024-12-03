import { EventFilters } from "@/types/eventFilters";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const useProductFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const search = searchParams.get("search") as EventFilters["search"];
  const category = searchParams.get("category") as EventFilters["category"];
  const city = searchParams.get("city") as EventFilters["city"];

  const setFilters = useCallback(
    (filters: EventFilters) => {
      const params = new URLSearchParams(searchParams.toString());

      if (filters.search !== undefined) {
        params.set("search", filters.search);
      } else {
        params.delete("search");
      }

      if (filters.category !== undefined) {
        params.set("category", filters.category);
      } else {
        params.delete("category");
      }

      if (filters.city !== undefined) {
        params.set("city", filters.city);
      } else {
        params.delete("city");
      }
      router.push(`?${params.toString()}`);
    }, [router, searchParams]);

  return {
    search,
    category,
    city,
    setFilters,
  };
};

export default useProductFilters;
