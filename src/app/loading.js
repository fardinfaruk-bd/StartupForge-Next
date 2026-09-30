
import { Circles } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full space-y-4">
      <Circles
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />

      <p className="text-sm font-medium text-gray-500 animate-pulse">
        Loading content...
      </p>
    </div>
  );
}