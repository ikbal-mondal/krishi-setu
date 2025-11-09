import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

const stories = [
  {
    id: 1,
    name: "Rahim Sheikh",
    location: "Nadia, West Bengal",
    image:
      "https://media.istockphoto.com/id/990892396/photo/indian-farmer-holding-crop-plant-in-his-wheat-field.jpg?s=612x612&w=0&k=20&c=je5zLlBPEeFplzaSAg_hLryRy2r9AiajSBV_2dd3u_A=",
    message:
      "After joining Krishi Setu, I directly connected with traders in Krishnanagar. My paddy harvest reached buyers faster, and I earned 25% more without middlemen.",
  },
  {
    id: 2,
    name: "Lalita Devi",
    location: "Patna, Bihar",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAUPt6ezvQwLi52tu2J4XFXX4omG3n7CV7HSBZD_wY2b7cMbDIozQ875hkZ1n2GuYSPms&usqp=CAU",
    message:
      "I sell my organic vegetables and homemade pickles through Krishi Setu. Local restaurants now contact me directly — it changed my life completely!",
  },
  {
    id: 3,
    name: "Rajesh Patel",
    location: "Surat, Gujarat",
    image:
      "https://img.freepik.com/premium-photo/happy-indian-farmer-showing-indian-ruppees-field_75648-2895.jpg",
    message:
      "With Krishi Setu, I found reliable buyers for my cotton produce. The digital platform helped me manage my crop records and connect with agri experts easily.",
  },
  {
    id: 4,
    name: "Amina Begum",
    location: "Murshidabad, West Bengal",
    image:
      "https://thesamikhsya.com/wp-content/uploads/2019/07/krishak-bandhu.jpg",
    message:
      "Before using Krishi Setu, my flower business was limited to local markets. Now I receive wholesale orders from Kolkata florists directly through the platform.",
  },
  {
    id: 5,
    name: "Harinder Singh",
    location: "Ludhiana, Punjab",
    image:
      "https://cmv360.s3.ap-southeast-1.amazonaws.com/Krishak_Jeevan_Jyoti_Yojana_Provides_6000_Units_of_Free_Electricity_0a0fedd8bb.png",
    message:
      "I adopted Krishi Setu to promote my wheat and dairy products. Within weeks, I built partnerships with 3 local retailers. It’s a real bridge between farmer and buyer.",
  },
  {
    id: 6,
    name: "Savita Pawar",
    location: "Nashik, Maharashtra",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUzKAFPimOhLRYFst12E0LRML67us4gyl82pS_lfz2vPs9ThaGZAVJE25KTUjYPgTrlso&usqp=CAU",
    message:
      "Selling grapes online seemed impossible before. Through Krishi Setu, I now get bulk orders from juice brands and earn better returns for my harvest.",
  },
];

export default function FarmerStories() {
  return (
    <section className="bg-white py-20 px-6 md:px-12" id="farmer-stories">
      <div className="max-w-7xl mx-auto text-center">
        {/* Heading */}
        <motion.h2
          className="text-4xl font-bold text-gray-800 mb-4"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          🌾 Farmer Success Stories
        </motion.h2>
        <p className="text-gray-500 text-lg mb-12 max-w-2xl mx-auto">
          Real stories from farmers who transformed their farming and trade
          experience through Krishi Setu.
        </p>

        {/* Swiper Slider */}
        <Swiper
          modules={[Pagination, Autoplay]}
          autoplay={{ delay: 4000 }}
          pagination={{ clickable: true }}
          spaceBetween={40}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {stories.map((story) => (
            <SwiperSlide key={story.id}>
              <motion.div
                className="bg-gray-50 border border-gray-100 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all h-full flex flex-col justify-between"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex flex-col items-center mb-5">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-sky-500 mb-4">
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    {story.name}
                  </h3>
                  <p className="text-sm text-gray-500">{story.location}</p>
                </div>

                <div className="relative text-gray-600 text-sm leading-relaxed italic">
                  <FaQuoteLeft className="text-sky-500 text-xl absolute -top-3 -left-1" />
                  <p className="pl-5">{story.message}</p>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
