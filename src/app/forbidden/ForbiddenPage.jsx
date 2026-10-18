'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Home, ShieldAlert } from 'lucide-react';

export default function ForbiddenPage() {
  const router = useRouter();

  return (
    <div className="min-h-[80vh] bg-transparent flex items-center justify-center p-6 text-white">
      <div className="max-w-md w-full text-center bg-white/[0.03] backdrop-blur-md rounded-2xl border border-white/10 p-8 shadow-2xl">
        
        {/* Shield / Lock Icon */}
        <div className="mx-auto w-16 h-16 bg-red-500/10 text-red-400 border border-red-500/20 rounded-2xl flex items-center justify-center mb-6">
          <ShieldAlert className="w-8 h-8" />
        </div>

        {/* Status Code & Main Text */}
        <span className="text-xs font-semibold uppercase tracking-widest text-red-400 bg-red-500/10 border border-red-500/20 px-3.5 py-1 rounded-full">
          Error 403 · Forbidden
        </span>
        <h1 className="text-2xl font-bold mt-4 mb-2 text-white">
          Access Denied
        </h1>
        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
          You don’t have permission to access this page. Please make sure you are logged in with the correct account or return home.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-white/15 text-gray-300 hover:text-white hover:bg-white/5 text-sm font-semibold transition"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition"
            style={{
              background: "#0DFFCA",
              color: "#030C1B",
              boxShadow: "0 0 16px rgba(13,255,202,0.3)",
            }}
          >
            <Home size={16} />
            Return Home
          </Link>
        </div>

      </div>
    </div>
  );
}