import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { WHITE, NAVY } from "./lib/constants";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Proviras",
  description: "Identity and reputation layer for AI agents.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={geist.className} style={{ margin: 0, background: "#ffffff", overscrollBehavior: "none" }}>
        <div style={{ fontFamily: "var(--font-geist-sans, 'GeistSans', ui-sans-serif, system-ui, sans-serif)", background: WHITE, minHeight: "100vh", color: NAVY, display: "flex", flexDirection: "column" }}>
        <Nav />
        {children}
        <Footer />
        </div>
      </body>
    </html>
  );
}