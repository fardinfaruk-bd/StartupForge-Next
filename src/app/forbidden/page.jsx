'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ForbiddenPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-slate-800">
      <div className="max-w-md w-full text-center bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        
        {/* Shield / Lock Icon */}
        <div className="mx-auto w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>

        {/* Status Code & Main Text */}
        <span className="text-xs font-semibold uppercase tracking-widest text-red-600 bg-red-100 px-3 py-1 rounded-full">
          Error 403
        </span>
        <h1 className="text-2xl font-bold mt-4 mb-2 text-slate-900">
          Access Denied
        </h1>
        <p className="text-slate-600 text-sm mb-6 leading-relaxed">
          You don’t have permission to access this page. Please make sure you are logged in with the correct account or return home.
        </p>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => router.back()}
            className="w-full sm:w-auto px-4 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
          >
            Go Back
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto px-4 py-2.5 text-sm font-medium text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-colors text-center"
          >
            Return Home
          </Link>
        </div>

      </div>
    </div>
  );
}