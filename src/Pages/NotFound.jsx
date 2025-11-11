import { FaHome } from "react-icons/fa";
import { Link } from "react-router";

export default function NotFound() {
  return (
    <section className="my-24 flex flex-col justify-center items-center bg-gradient-to-br from-sky-50 via-white to-blue-100 px-4 text-center relative overflow-hidden">
      <h1 className="text-[7rem] font-extrabold text-sky-600 drop-shadow-md">
        404
      </h1>

      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
        Page Not Found
      </h2>

      <p className="text-gray-600 max-w-md mb-6">
        The page you're looking for doesn’t exist or may have been moved.
      </p>

      <Link
        to="/"
        className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-md shadow-md transition-all"
      >
        <FaHome />
        Back to Home
      </Link>

      <div className="absolute bottom-10 w-72 h-72 bg-sky-300 blur-3xl rounded-full opacity-30"></div>
    </section>
  );
}
