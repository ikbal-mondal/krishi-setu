import { Link } from "react-router";
import { FaMapMarkerAlt, FaLeaf } from "react-icons/fa";

export default function CropCard({ crop }) {
  const { _id, name, type, pricePerUnit, unit, location, image } = crop;

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all overflow-hidden group cursor-pointer">
      {/* Image Area */}
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-56 object-cover transform group-hover:scale-105 transition duration-500"
        />

        {/* Type Badge */}
        <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-xs font-medium text-gray-700 shadow-md flex items-center gap-1">
          <FaLeaf className="text-sky-600" /> {type}
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-3 left-3 bg-sky-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
          ₹{pricePerUnit}/{unit}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 space-y-3">
        {/* Crop Name */}
        <h3 className="text-xl font-bold text-gray-800 line-clamp-1">{name}</h3>

        {/* Location */}
        <div className="flex items-center text-gray-600 text-sm gap-2">
          <FaMapMarkerAlt className="text-sky-600" />
          {location}
        </div>

        {/* CTA Button */}
        <Link
          to={`/crops/${_id}`}
          className="block w-full text-center bg-sky-600 hover:bg-sky-700 text-white font-medium py-2 rounded-lg transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
