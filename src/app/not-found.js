import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        
        {/* Illustration: Lightweight, crisp inline SVG */}
        <div className="w-full max-w-[360px] mx-auto mb-8 text-indigo-600">
          <svg
            viewBox="0 0 400 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
          >
            <circle cx="200" cy="150" r="100" fill="#E0E7FF" />
            {/* Sad/Confused mouth */}
            <path
              d="M150 165 C 150 140, 250 140, 250 165"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
            />
            {/* Eyes */}
            <circle cx="165" cy="115" r="10" fill="currentColor" />
            <circle cx="235" cy="115" r="10" fill="currentColor" />
            {/* Tech details/grounding lines */}
            <path d="M180 240 H 220" stroke="#C7D2FE" strokeWidth="6" strokeLinecap="round" />
            <path d="M140 260 H 260" stroke="#C7D2FE" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </div>

        {/* Error Message */}
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
          Page Not Found
        </h1>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          The page you are looking for doesn't exist, has been removed, or is hiding in another dimension.
        </p>

        {/* Back Home Button */}
        <Link 
          href="/"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Return to Home
        </Link>
        
      </div>
    </div>
  );
}