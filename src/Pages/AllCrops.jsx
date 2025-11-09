import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import api from "../services/api";
import CropCard from "../Components/CropCard";

export default function AllCrops() {
  const [crops, setCrops] = useState([]);
  const [filteredCrops, setFilteredCrops] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const res = await api.get("/crops");
        const sorted = (res.data || []).sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setCrops(sorted);
        setFilteredCrops(sorted);
      } catch (err) {
        console.error("❌ Error fetching crops:", err);
        setError("Failed to load crops.");
      } finally {
        setLoading(false);
      }
    };
    fetchCrops();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);

    if (!query.trim()) {
      setFilteredCrops(crops);
      return;
    }

    const filtered = crops.filter(
      (crop) =>
        crop.name.toLowerCase().includes(query) ||
        crop.type.toLowerCase().includes(query) ||
        crop.location.toLowerCase().includes(query)
    );
    setFilteredCrops(filtered);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="loading loading-spinner loading-lg text-sky-600"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 font-medium py-20">{error}</div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-14">
      {/* Header + Search */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
        <h2 className="text-3xl font-bold text-gray-800">🌾 All Crops</h2>

        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search crops by name, type or location..."
            className="input input-bordered w-full pl-10"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      {/* Crop Grid */}
      {filteredCrops.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          No crops found matching your search.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCrops.map((crop) => (
            <CropCard key={crop._id} crop={crop} />
          ))}
        </div>
      )}
    </section>
  );
}
