import { useState, useEffect } from "react";

const ads = [
  {
    id: 1,
    title: "Change your practice management software",
    desc: "Upgrade to faster, smarter & modern tools.",
    img: "https://zandahealth.com/media/image-768x799.webp",
    button: "Download Guide",
    link: "#",
  },
  {
    id: 2,
    title: "Grow your farming business",
    desc: "Get access to tools that increase productivity.",
    img: "https://anugrahafarms.com/wp-content/uploads/2025/02/How-to-Turn-Your-Farmland-into-a-Profitable-Organic-Farming-Business-1.jpg",
    button: "Learn More",
    link: "#",
  },
  {
    id: 3,
    title: "Boost your sales instantly",
    desc: "Promote crops easily and find interested buyers.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuyfg0GCWhhS2_GQXHL_T9Qm8XZRj2pCebFQ&s",
    button: "Start Now",
    link: "#",
  },
];

export default function AdSlider() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % ads.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % ads.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + ads.length) % ads.length);
  };

  return (
    <div className="relative my-4 bg-sky-500 text-white rounded-xl p-4 md:p-6 shadow-xl w-full ">
      {/* Close Button */}
      <button
        className="absolute top-3 right-3 bg-white/30 hover:bg-white/50 text-white rounded-full p-1 md:p-2"
        onClick={() => setVisible(false)}
      >
        ✕
      </button>

      {/* Slider Content */}
      <div className="flex flex-col items-center text-center space-y-4">
        <img
          src={ads[current].img}
          alt="ad"
          className="rounded-xl shadow-lg w-40 h-40 md:w-52 md:h-52 object-cover"
        />

        <h2 className="text-lg md:text-xl font-bold">{ads[current].title}</h2>

        <p className="text-white/90 text-sm md:text-base px-1">
          {ads[current].desc}
        </p>

        <a
          href={ads[current].link}
          className="bg-white text-sky-600 font-medium py-2 px-4 rounded-lg shadow hover:bg-gray-100 text-sm md:text-base"
        >
          {ads[current].button}
        </a>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
        <button
          onClick={prevSlide}
          className="px-2 md:px-3 py-1 bg-white/40 hover:bg-white/60 rounded-md text-white"
        >
          ‹
        </button>
        <button
          onClick={nextSlide}
          className="px-2 md:px-3 py-1 bg-white/40 hover:bg-white/60 rounded-md text-white"
        >
          ›
        </button>
      </div>
    </div>
  );
}
