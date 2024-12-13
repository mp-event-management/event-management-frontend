export type EventFilters = {
  search?: string;
  category:
    | "All Events"
    | "Music"
    | "Sports"
    | "Social Activities"
    | "Technologies"
    | "Food & Drinks"
    | "Art"
    | "Health & Wellness"
    | "Education"
    | "Travel"
    | "Bussiness"
    | "Gaming";
  city: "Jakarta" | "Bandung" | "Medan" | "Surabaya" | "Bogor";
};
