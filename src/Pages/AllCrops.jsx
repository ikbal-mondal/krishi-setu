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

  const [filterType, setFilterType] = useState("All");
  const [filterLocation, setFilterLocation] = useState("All");
  const [sortOption, setSortOption] = useState("newest");

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

  const uniqueLocations = [...new Set(crops.map((c) => c.location))];

  const applyFilters = (list) => {
    let result = [...list];

    // Search filter
    if (search.trim()) {
      result = result.filter(
        (crop) =>
          crop.name.toLowerCase().includes(search.toLowerCase()) ||
          crop.type.toLowerCase().includes(search.toLowerCase()) ||
          crop.location.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Type filter
    if (filterType !== "All") {
      result = result.filter((crop) => crop.type === filterType);
    }

    // Location filter
    if (filterLocation !== "All") {
      result = result.filter((crop) => crop.location === filterLocation);
    }

    // Sorting
    if (sortOption === "newest") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortOption === "oldest") {
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortOption === "price-low") {
      result.sort((a, b) => a.pricePerUnit - b.pricePerUnit);
    } else if (sortOption === "price-high") {
      result.sort((a, b) => b.pricePerUnit - a.pricePerUnit);
    }

    setFilteredCrops(result);
  };

  useEffect(() => {
    applyFilters(crops);
  }, [search, filterType, filterLocation, sortOption, crops]);

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
      {/* Header + Filters */}
      <div className="flex flex-col md:flex-row  items-center gap-4 mb-10">
        <h2 className="text-3xl font-bold text-gray-800">🌾 All Crops</h2>
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="input input-bordered w-full pl-10"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Search */}

          {/* Type Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="select select-bordered"
          >
            <option value="All">All Types</option>
            <option value="Vegetable">Vegetable</option>
            <option value="Fruit">Fruit</option>
            <option value="Grain">Grain</option>
            <option value="Pulse">Pulse</option>
            <option value="Other">Other</option>
          </select>

          {/* Location Filter */}
          <select
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
            className="select select-bordered"
          >
            <option value="All">All Locations</option>
            {uniqueLocations.map((loc, index) => (
              <option key={index} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Crop Grid */}
      {filteredCrops.length === 0 ? (
        <div className="text-center py-20 text-gray-500">No crops found.</div>
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
