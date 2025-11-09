import { motion } from "framer-motion";
import { Link } from "react-router";

const agroNews = [
  {
    id: 1,
    title: "Government Launches New Subsidy Scheme for Organic Farmers",
    desc: "The Ministry of Agriculture introduced a nationwide subsidy initiative to support farmers transitioning to organic farming methods, offering up to ₹50,000 per hectare.",
    image:
      "https://images.unsplash.com/photo-1607619056574-7b8efbd94c1d?auto=format&fit=crop&w=1000&q=80",
    date: "Nov 5, 2025",
    author: "Agro Times India",
  },
  {
    id: 2,
    title: "Innovative Irrigation System Saves 40% Water in West Bengal",
    desc: "A group of young innovators from Nadia district developed a low-cost drip irrigation system that reduces water usage and boosts crop yield significantly.",
    image:
      "https://images.unsplash.com/photo-1602526216435-3e3a5e6f8f6a?auto=format&fit=crop&w=1000&q=80",
    date: "Oct 28, 2025",
    author: "Krishi News Network",
  },
  {
    id: 3,
    title: "Farmers Adopt Smart Weather Sensors for Better Crop Planning",
    desc: "With climate change affecting crop cycles, smart IoT weather sensors are helping farmers in rural India plan irrigation and pesticide use efficiently.",
    image:
      "https://images.unsplash.com/photo-1565120130286-5f44a31621f9?auto=format&fit=crop&w=1000&q=80",
    date: "Oct 15, 2025",
    author: "Agro Tech Today",
  },
];

export default function AgroNews() {
  return (
    <section className="bg-white py-20 px-6 md:px-12" id="agro-news">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-3">
            📰 Agro News & Blogs
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Stay updated with the latest trends, innovations, and stories from
            India’s growing agricultural community.
          </p>
        </motion.div>

        {/* News Grid */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {agroNews.map((news, index) => (
            <motion.div
              key={news.id}
              className="group bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col justify-between h-60">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-sky-600 transition-colors">
                    {news.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-3">
                    {news.desc.length > 120
                      ? news.desc.slice(0, 120) + "..."
                      : news.desc}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center text-sm text-gray-400 border-t pt-3">
                  <span>{news.author}</span>
                  <span>{news.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Read More CTA */}
        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            to="/blogs"
            className="inline-block bg-sky-600 hover:bg-sky-700 text-white font-semibold px-8 py-3 rounded-full shadow-md transition-all"
          >
            View All Articles →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
