import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eventsbro",
  description: "Choose your desired event to join",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins}`}
      >
        {children}
      </body>
    </html>
  );
}
