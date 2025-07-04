import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#171717] text-white p-8">
      <div className="flex flex-col items-center justify-center space-y-8">
        <h1 className="text-6xl font-semibold text-gray-100 tracking-wide">
          404
        </h1>
        <p className="text-3xl text-gray-300">Page Not Found</p>
        <div className="space-y-4 text-center max-w-2xl">
          <p className="text-lg text-gray-300">
            The page you are looking for might have been moved or doesn&apos;t
            exist.
          </p>
          <p className="text-lg text-gray-300">
            1. Check if the URL is correct.
          </p>
          <p className="text-lg text-gray-300">
            2. Go back to the{" "}
            <Link
              href="/"
              className="text-blue-400 hover:text-blue-500 transition duration-300 font-semibold"
            >
              homepage
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
