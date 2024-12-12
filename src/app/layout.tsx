import type { Metadata } from "next";
import "./globals.css";
import { Nunito } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";
import QueryClientProviderWrapper from "@/provider/QueryClientProviderWrapper";

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
  variable: "--font-nunito",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
        <html lang="en">
          <body className={`${nunito.className}`}>
            <QueryClientProviderWrapper>
              <main>{children}</main>
            <Toaster />
            </QueryClientProviderWrapper>
          </body>
        </html>
    </SessionProvider>
  );
}
