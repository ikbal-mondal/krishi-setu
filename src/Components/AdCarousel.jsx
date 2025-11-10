import { useState, useEffect } from "react";

export default function AdCarousel() {
  const ads = [
    {
      img: "https://img.freepik.com/premium-photo/organic-farming-concept-banner_916191-217218.jpg",
      title: "Buy Organic Fertilizer",
      link: "https://example.com",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzc2EuyS3_ufvOD4EJBmAGrfwMjTQyGfHOpNEWGJCOL_-fJSkw_qQsjMMYTupBk0R0laE&usqp=CAU",
      title: "Tractor Rental Service",
      link: "https://example.com",
    },
    {
      img: "https://img.freepik.com/free-photo/close-up-crops-with-sunset_23-2148738445.jpg",
      title: "High-quality Seeds",
      link: "https://example.com",
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ads.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md my-8 overflow-hidden border border-gray-200 p-2">
      <h3 className="text-lg font-semibold   mb-3 px-2">Ad</h3>

      <a href={ads[index].link} target="_blank" rel="noopener noreferrer">
        <img
          src={ads[index].img}
          alt={ads[index].title}
          className="w-full h-40 object-cover rounded-lg"
        />
      </a>

      {/* Caption */}
      <p className="text-center text-gray-700 mt-3 font-medium">
        {ads[index].title}
      </p>

      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-3 mb-1">
        {ads.map((_, i) => (
          <span
            key={i}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              i === index ? "bg-sky-600" : "bg-gray-300"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
}
