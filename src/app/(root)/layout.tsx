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
      <main>
        <div className="pb-24 pt-[72px]">{children}</div>
      </main>
      <Footer />
    </>
  );
}
