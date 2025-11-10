import { useState } from "react";

export default function AdCard() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null; // Hide completely when closed

  return (
    <div className="relative transition-all duration-500">
      {/* Ad Card */}
      <div className="bg-gradient-to-br from-sky-50 to-white rounded-xl shadow-md border border-sky-200 p-5 text-center hover:shadow-lg transition-all duration-300">
        {/* Close Icon */}
        <button
          onClick={() => setVisible(false)}
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100 "
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/1828/1828778.png"
            className="w-4"
            alt="close"
          />
        </button>

        {/* Ad Badge */}
        <span className="absolute top-2 left-2 bg-yellow-400 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm">
          AD
        </span>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/7659/7659025.png"
            alt="Seed Icon"
            className="w-16 h-16"
          />
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-800 mb-2">
          🌾 Buy Fresh Organic Seeds
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-3">
          High-quality seeds for better growth & yield. Fresh, organic, and
          delivered to your doorstep.
        </p>

        {/* CTA Button */}
        <a
          href="#"
          target="_blank"
          className="mt-3 inline-block bg-sky-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-sky-700 transition"
        >
          Shop Now
        </a>
      </div>
    </div>
  );
}
