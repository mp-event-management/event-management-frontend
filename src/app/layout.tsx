"use client";

// import type { Metadata } from "next";
import "./globals.css";
import { Nunito } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";

// export const metadata: Metadata = {
//   title: "Eventbro",
//   description: "Choose your desired event to join",
//   icons: {
//     icon: [
//       {
//         rel: "icon",
//         type: "image/svg",
//         sizes: "42x42",
//         url: "/favicon.svg",
//       },
//     ],
//   },
// };

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <html lang="en">
          <body className={`${nunito.className}`}>
            <main>{children}</main>
            <Toaster/>
          </body>
        </html>
      </QueryClientProvider>
    </SessionProvider>
  );
}
