import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      <main>
        <div className="pb-20 pt-24">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
