import Footer from "@/components/footer/Footer";
import NoSearchNavbar from "@/components/navbar/NoSearchNavbar";

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
