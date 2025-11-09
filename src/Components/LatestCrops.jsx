import { useEffect, useState } from "react";
import { Link } from "react-router";
import api from "../services/api";
import CropCard from "./CropCard";

export default function LatestCrops() {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const res = await api.get("/crops");
        // ✅ Sort newest first and slice only latest 6
        const sorted = (res.data || []).sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setCrops(sorted.slice(0, 6));
      } catch (err) {
        console.error("❌ Error fetching crops:", err);
        setError("Failed to load latest crops.");
      } finally {
        setLoading(false);
      }
    };
    fetchCrops();
  }, []);

  // Loading UI
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="loading loading-spinner loading-lg text-sky-600"></span>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center text-red-600 font-medium py-10">{error}</div>
    );
  }

  // Empty state
  if (crops.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">No crops found yet.</div>
    );
  }

  // ✅ Display crops
  return (
    <section className="max-w-7xl mx-auto px-4 py-14">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">🌱 Latest Crops</h2>
        <Link
          to="/all-crops"
          className="text-sky-600 font-medium hover:underline"
        >
          View All →
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {crops.map((crop) => (
          <CropCard key={crop._id} crop={crop} />
        ))}
      </div>
    </section>
  );
}
