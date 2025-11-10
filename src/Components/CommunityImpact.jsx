import { motion } from "framer-motion";
import { FaUsers, FaSeedling, FaHandshake, FaGlobeAsia } from "react-icons/fa";

const stats = [
  {
    icon: <FaUsers className="text-4xl text-sky-600" />,
    title: "Active Farmers",
    value: "8,500+",
    desc: "Registered and verified farmers growing together",
  },
  {
    icon: <FaSeedling className="text-4xl text-green-600" />,
    title: "Crops Listed",
    value: "12,000+",
    desc: "Organic and hybrid crops shared across India",
  },
  {
    icon: <FaHandshake className="text-4xl text-yellow-600" />,
    title: "Successful Deals",
    value: "4,200+",
    desc: "Farmer-trader collaborations made possible",
  },
  {
    icon: <FaGlobeAsia className="text-4xl text-sky-600" />,
    title: "Regions Covered",
    value: "24 States",
    desc: "Growing agricultural network across India",
  },
];

export default function CommunityImpact() {
  return (
    <section className="bg-gradient-to-r from-sky-600 via-sky-500 to-sky-700 py-20 px-6 md:px-12 text-white">
      <div className="max-w-7xl mx-auto text-center">
        {/* Header */}
        <motion.h2
          className="text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          🌍 Krishi Community & Impact
        </motion.h2>
        <p className="text-sky-100 text-lg mb-14 max-w-2xl mx-auto">
          Krishi Setu connects thousands of people in agriculture — bridging the
          gap between farmers, traders, and consumers.
        </p>

        {/* Stats Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white backdrop-blur-md rounded-2xl p-8 hover:bg-white/80 transition-all shadow-md"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="mb-4 flex justify-center ">{stat.icon}</div>
              <h3 className="text-2xl font-bold mb-1 text-sky-700">
                {stat.value}
              </h3>
              <p className="font-semibold mb-1 text-sky-700">{stat.title}</p>
              <p className="text-sm text-sky-700">{stat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
