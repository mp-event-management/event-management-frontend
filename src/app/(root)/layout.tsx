import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="pb-24 pt-[96px]">{children}</main>
      <Footer />
    </>
  );
}
