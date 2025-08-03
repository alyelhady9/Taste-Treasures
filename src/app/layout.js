import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Header1 from "./components/Header1";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Taste Treasures",
  description: "Discover a world of delicious recipes from around the globe with our easy-to-use recipe web app. Find, save, and share your favorite meals, from quick weeknight dinners to gourmet dishes. Explore diverse cuisines, filter by ingredients, and enjoy step-by-step cooking instructions. Perfect for food enthusiasts and home cooks alike!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
       <Header1 />
        {/* <Header /> */}

        {children}
        <Footer />
      </body>
    </html>
  );
}
