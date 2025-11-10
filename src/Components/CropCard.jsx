import { Link } from "react-router";
import { FaMapMarkerAlt, FaLeaf, FaUser } from "react-icons/fa";

export default function CropCard({ crop }) {
  const { _id, name, type, pricePerUnit, unit, location, image, owner } = crop;

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl border border-gray-100 transition-all overflow-hidden group cursor-pointer hover:-translate-y-1">
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-56 object-cover transform group-hover:scale-105 transition duration-500"
          loading="lazy"
        />

        {/* Type Badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-gray-700 shadow-md flex items-center gap-1">
          <FaLeaf className="text-sky-600" /> {type}
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-3 left-3 bg-sky-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-md">
          ₹{pricePerUnit}/{unit}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 space-y-2">
        {/* Crop Name */}
        <h3 className="text-xl font-bold text-gray-800 truncate">{name}</h3>

        {/* Owner */}
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <FaUser className="text-sky-600" />
          <span className="font-medium">
            {owner?.ownerName || "Farmer"}
          </span>{" "}
          (Owner Name)
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <FaMapMarkerAlt className="text-sky-600" />
          {location}
        </div>

        {/* Divider */}
        <div className="h-[1px] w-full bg-gray-100"></div>

        <Link
          to={`/crops/${_id}`}
          className="block w-full text-center bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-700 hover:to-cyan-700 text-white font-medium py-2.5 rounded-lg transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
