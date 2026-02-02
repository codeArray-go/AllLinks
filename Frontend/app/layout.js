import "./globals.css";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import BackgroundWrapper from "@/components/BackgroundWrapper";
import Footer from "@/components/Footer";

export const metadata = {
  title: "AllLinks",
  description:
    "Paste your link to make it easy for others to find you on different plateform",
  icons: {
    icon: "/Hawk.svg",
  },
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className="antialiased relative">
        <div></div>
        <BackgroundWrapper>
          <Navbar />
          {children}
        </BackgroundWrapper>
        <Loader />
        <Footer />
      </body>
    </html>
  );
}
