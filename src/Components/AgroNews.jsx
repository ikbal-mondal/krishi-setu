import { motion } from "framer-motion";
import { Link } from "react-router";

const agroNews = [
  {
    id: 1,
    title: "India Expands Digital Agriculture Mission for Smart Farming",
    desc: "The Digital Agriculture Mission (DAM 2025) aims to empower farmers with real-time data analytics, satellite crop mapping, and AI-powered decision support for precision agriculture.",
    image:
      "https://feeds.abplive.com/onecms/images/uploaded-images/2022/12/15/abe55d33db7363878d41a8de17ca7d631671091098094455_original.jpg?impolicy=abp_cdn&imwidth=1200",
    date: "Nov 8, 2025",
    author: "Agro Insight",
  },
  {
    id: 2,
    title: "Nadia Farmers Adopt Eco-Friendly Bio-Fertilizers",
    desc: "Farmers in West Bengal’s Nadia district are leading a green revolution using bio-fertilizers that improve soil health and reduce chemical dependency by 60%.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwBWpbxOcdQbmsWr97SNbLBr5xPsQGROgT4xMfXtSY5rjimXSyFpDYwnr7EYc5hl-Yq2o&usqp=CAU",
    date: "Nov 1, 2025",
    author: "Krishi Connect News",
  },
  {
    id: 3,
    title: "India’s Agri-Exports Cross ₹4 Lakh Crore Milestone in 2025",
    desc: "Thanks to digital marketplaces and sustainable practices, India’s agricultural export value reached a new record, strengthening the rural economy and farmer income.",
    image:
      "https://dst.news/wp-content/uploads/2024/10/image_750x500_645c97cd28f69.jpg",
    date: "Oct 26, 2025",
    author: "Economic Agri Journal",
  },
  {
    id: 4,
    title: "AI Crop Monitoring Boosts Paddy Yield by 30%",
    desc: "With the introduction of AI-powered sensors in rice fields, farmers in eastern India report significant yield improvements and water efficiency gains.",
    image:
      "https://farmonaut.com/wp-content/uploads/2025/05/AI-for-Crop-Prediction-7-Powerful-Ways-to-Boost-Yields_1.jpg",
    date: "Oct 15, 2025",
    author: "Future Farming India",
  },
];

export default function AgroNews() {
  return (
    <section className="bg-gray-50 py-20 px-6 md:px-12" id="agro-news">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
            Latest Agro News & Insights
          </h2>
          <p className="text-gray-500 text-lg max-w-3xl mx-auto leading-relaxed">
            Get inspired by the latest updates, innovations, and policies
            shaping the future of Indian agriculture — straight from the field
            to your screen.
          </p>
        </motion.div>

        {/* News Layout */}
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Featured News - Large Left */}
          <motion.div
            className="lg:col-span-2 relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={agroNews[0].image}
              alt={agroNews[0].title}
              className="w-full h-[480px] object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <div className="absolute bottom-8 left-8 text-white max-w-xl">
              <h3 className="text-2xl font-bold mb-3 leading-snug">
                {agroNews[0].title}
              </h3>
              <p className="text-gray-200 mb-4 text-sm leading-relaxed">
                {agroNews[0].desc}
              </p>
              <p className="text-sm text-gray-300">
                {agroNews[0].author} · {agroNews[0].date}
              </p>
            </div>
          </motion.div>

          {/* Right Column - Small News */}
          <div className="flex flex-col gap-6">
            {agroNews.slice(1).map((news, index) => (
              <motion.div
                key={news.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 flex flex-col sm:flex-row"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full sm:w-1/3 h-48 sm:h-auto object-cover"
                />
                <div className="p-5 flex flex-col justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 hover:text-sky-600 transition-colors leading-tight">
                      {news.title}
                    </h4>
                    <p className="text-sm text-gray-500 mt-2 line-clamp-3">
                      {news.desc}
                    </p>
                  </div>
                  <p className="text-xs text-gray-400 mt-3">
                    {news.author} · {news.date}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            to="/all-crops"
            className="inline-block bg-sky-600 hover:bg-sky-700 text-white font-semibold px-10 py-3 rounded-full shadow-md transition-all"
          >
            View All Crops →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
