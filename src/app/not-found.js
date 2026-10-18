import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] bg-transparent flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full">
        {/* Glow Tag */}
        <span
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-6 border"
          style={{
            background: "rgba(13,255,202,0.08)",
            borderColor: "rgba(13,255,202,0.2)",
            color: "#0DFFCA",
          }}
        >
          404 Error
        </span>

        {/* Big Code */}
        <div className="relative mb-4">
          <span
            className="text-8xl sm:text-9xl font-black tracking-tighter"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.1) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            404
          </span>
          <div
            className="absolute inset-0 blur-3xl opacity-30 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(13,255,202,0.6) 0%, transparent 60%)",
            }}
          />
        </div>

        {/* Error Message */}
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
          Lost in the Startup Space?
        </h1>
        <p className="text-gray-400 text-sm sm:text-base mb-8 leading-relaxed">
          The page you are looking for doesn't exist, has been relocated, or is
          still being forged.
        </p>

        {/* Back Home Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg"
          style={{
            background: "#0DFFCA",
            color: "#030C1B",
            boxShadow: "0 0 24px rgba(13,255,202,0.35)",
          }}
        >
          <ArrowLeft size={16} />
          Return to Home
        </Link>
      </div>
    </div>
  );
}