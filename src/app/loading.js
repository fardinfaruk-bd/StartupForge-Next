
export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-100 w-full space-y-4">
      {/* Animated Spinner Ring */}
      <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
      
      {/* Optional Loading Text */}
      <p className="text-sm font-medium text-gray-500 animate-pulse">
        Loading content...
      </p>
    </div>
  );
}