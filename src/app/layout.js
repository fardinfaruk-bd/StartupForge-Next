import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Shared/Navbar";
import Footer from "@/components/Shared/Footer";
import CursorGlow from "@/components/Shared/CursorGlow";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "StartupForge",
  description: "Connect with high-growth startups and visionary founders.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`dark ${geistSans.variable} ${geistMono.variable} min-h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen flex flex-col bg-[#030C1B] text-slate-100 selection:bg-[#0DFFCA]/30 selection:text-white relative"
      >
        {/* Global Landing-Page Style Ambient Mesh Background Across All Routes */}
        <div
          className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden"
          aria-hidden="true"
        >
          {/* Top Radial Teal/Cyan Glow */}
          <div
            className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[1200px] h-[750px] opacity-35 blur-[130px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(13,255,202,0.18) 0%, rgba(108,142,255,0.12) 40%, transparent 70%)",
            }}
          />
          {/* Bottom Right Radial Glow */}
          <div
            className="absolute -bottom-[15%] right-[-10%] w-[900px] h-[650px] opacity-25 blur-[140px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(108,142,255,0.15) 0%, rgba(13,255,202,0.08) 50%, transparent 70%)",
            }}
          />
          {/* Subtle Starry Dot Grid Overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <CursorGlow />
        <Navbar />
        <main className="flex-1 w-full relative">{children}</main>
        <Footer />

        <ToastContainer theme="dark" />
      </body>
    </html>
  );
}
