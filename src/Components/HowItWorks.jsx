import {
  FaSeedling,
  FaHandshake,
  FaUserFriends,
  FaCheckCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "1️⃣ Create Your Account",
      desc: "Farmers, traders, and consumers can register easily using email or Google. Your digital agro journey begins here.",
      icon: <FaUserFriends className="text-4xl text-sky-600" />,
    },
    {
      id: 2,
      title: "2️⃣ Add or Explore Crops",
      desc: "Farmers can post details of what they grow or sell, and others can browse a rich collection of fresh crops.",
      icon: <FaSeedling className="text-4xl text-sky-600" />,
    },
    {
      id: 3,
      title: "3️⃣ Send Interest Request",
      desc: "If you find a crop you like, send an interest message directly to the farmer with your desired quantity and message.",
      icon: <FaHandshake className="text-4xl text-sky-600" />,
    },
    {
      id: 4,
      title: "4️⃣ Connect & Collaborate",
      desc: "Once the owner accepts your interest, you can connect, collaborate, and grow your agro business together.",
      icon: <FaCheckCircle className="text-4xl text-sky-600" />,
    },
  ];

  return (
    <section className="bg-gray-50 py-20 px-6 md:px-12" id="how-it-works">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-4xl font-bold text-gray-800 mb-4"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          🌾 How Krishi Setu Works
        </motion.h2>
        <p className="text-gray-500 text-lg mb-12 max-w-2xl mx-auto">
          A simple and transparent system to connect everyone in agriculture —
          from the field to your home.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: step.id * 0.1 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 flex flex-col items-center"
            >
              <div className="bg-sky-100 rounded-full p-4 mb-5">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                {step.title}
              </h3>
              <p className="text-gray-500 text-center text-sm leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <a
            href="/register"
            className="inline-block bg-sky-600 hover:bg-sky-700 text-white px-8 py-3 rounded-full font-semibold shadow-md transition-all"
          >
            Join Krishi Setu Today →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
