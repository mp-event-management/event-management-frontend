import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { SessionProvider } from "next-auth/react"

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

const nunito = Nunito({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.className}`}>
      <SessionProvider>
      <Navbar />
        <div className="pb-20 pt-24">{children}</div>
        <Footer />
      </SessionProvider>
        
      </body>
    </html>
  );
}
