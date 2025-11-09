import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function HeroSlider() {
  const slides = [
    {
      id: 1,
      title: "Empowering Farmers, Connecting Markets",
      desc: "Share your harvest and connect directly with buyers and traders.",
      img: "https://blog.bluelupin.com/wp-content/uploads/5-1-3.jpg",
    },
    {
      id: 2,
      title: "Fresh Crops From Rural Fields",
      desc: "Grow together — build partnerships, sell produce, and support farmers.",
      img: "https://t3.ftcdn.net/jpg/06/05/28/60/360_F_605286010_v7je41vc47s0Aeu5chVomxW0Icutrcn4.jpg",
    },
    {
      id: 3,
      title: "A Digital Bridge for Agriculture",
      desc: "Krishi Setu connects farmers, sellers, and consumers — one platform.",
      img: "https://klcgroup.vn/wp-content/uploads/2023/09/b4da1f17be7d6a23336c.jpg",
    },
  ];

  return (
    <div className="w-full  border-4 rounded-b-2xl border-sky-600 h-[50vh] md:h-[80vh] relative">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop
        className="h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="w-full h-full  relative">
              <img
                src={slide.img}
                alt={slide.title}
                className="w-full rounded-xl h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10 flex flex-col justify-center text-white px-6 md:px-16 lg:px-28">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight drop-shadow">
                  {slide.title}
                </h2>
                <p className="max-w-xl text-sm md:text-lg mb-6 drop-shadow">
                  {slide.desc}
                </p>

                <Link
                  to="/all-crops"
                  className="inline-block bg-white text-sky-600 font-semibold px-5 py-2 rounded-md shadow-md hover:bg-sky-100 transition-all w-max"
                >
                  Explore Crops →
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
