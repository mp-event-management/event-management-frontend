import Footer from "@/components/footer/Footer";
import NoSearchNavbar from "@/components/navbar/NoSearchNabbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <NoSearchNavbar />
      <main>
        <div className="pb-20 pt-24">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
