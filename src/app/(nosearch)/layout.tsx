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
      <main>
        <div className="pb-20 pt-24">{children}</div>
      </main>
      <Footer />
    </>
  );
}
