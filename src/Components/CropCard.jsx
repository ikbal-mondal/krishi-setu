import { Link } from "react-router";

export default function CropCard({ crop }) {
  const { _id, name, type, pricePerUnit, unit, location, image, owner } = crop;

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover"
        loading="lazy"
      />
      <div className="p-4 space-y-1">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-500 capitalize">{type}</p>
        <p className="text-sm font-medium text-sky-600">
          ₹{pricePerUnit}/{unit}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Location:</span> {location}
        </p>
        <p className="text-xs text-gray-400">
          By {owner?.ownerName || "Farmer"}
        </p>

        <div className="pt-2">
          <Link
            to={`/crops/${_id}`}
            className="inline-block bg-sky-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-sky-700 transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
