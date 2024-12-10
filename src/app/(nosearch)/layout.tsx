import Footer from "@/components/footer/Footer";
import NoSearchNavbar from "@/components/navbar/NoSearchNavbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eventbro",
  description: "Choose your desired event to join",
  icons: {
    icon: [
      {
        rel: "icon",
        type: "image/svg",
        sizes: "42x42",
        url: "/favicon.svg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NoSearchNavbar />
      <main className="pb-20 pt-[96px]">{children}</main>
      <Footer />
    </>
  );
}
