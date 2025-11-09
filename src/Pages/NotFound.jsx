import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaHome } from "react-icons/fa";

export default function NotFound() {
  return (
    <section className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-100 px-4 text-center">
      {/* Animated Number */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-[8rem] font-extrabold text-sky-600 drop-shadow-lg"
      >
        404
      </motion.h1>

      {/* Subtitle */}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-3xl font-bold text-gray-800 mb-3"
      >
        Oops! Page Not Found
      </motion.h2>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-gray-600 max-w-md mb-8"
      >
        The page you’re looking for doesn’t exist or has been moved. Let’s get
        you back to something that works.
      </motion.p>

      {/* Back to Home Button */}
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.7 }}
      >
        <Link
          to="/"
          className="btn bg-sky-600 hover:bg-sky-700 text-white flex items-center gap-2 px-6"
        >
          <FaHome />
          Back to Home
        </Link>
      </motion.div>

      {/* Decorative Shape */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 0.4, y: 0 }}
        transition={{ delay: 1 }}
        className="absolute bottom-10 w-72 h-72 bg-sky-200 blur-3xl rounded-full"
      ></motion.div>
    </section>
  );
}
