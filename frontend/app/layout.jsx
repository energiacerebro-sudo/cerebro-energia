import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata = {
  title: "Cerebro Energia",
  description: "Clean energy systems and infrastructure.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gradient-to-br from-ink via-[#0e1322] to-[#121e26]">
          <Navbar />
          <div className="pt-[72px]">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
