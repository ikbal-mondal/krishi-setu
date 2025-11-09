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
      <div className="grid lg:grid-cols-4 gap-10">
        {/* ================= Sidebar ================= */}
        <aside className="lg:col-span-1 bg-white shadow-md border border-gray-100 rounded-xl p-6 h-fit">
          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-700 mb-6">
            🔍 Filter Crops
          </h2>

          {/* Search */}
          <div className="relative mb-6">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search crop..."
              className="input input-bordered w-full pl-10"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>

          {/* Category Filter */}
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Category</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {["All", "Vegetable", "Fruit", "Grain", "Pulse", "Other"].map(
              (cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterType(cat)}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition 
                ${
                  filterType === cat
                    ? "bg-sky-600 text-white border-sky-700 shadow"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                >
                  {cat}
                </button>
              )
            )}
          </div>

          {/* Location Filter */}
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Location</h3>
          <select
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
            className="select select-bordered w-full mb-6"
          >
            <option value="All">All Locations</option>
            {uniqueLocations.map((loc, idx) => (
              <option key={idx} value={loc}>
                {loc}
              </option>
            ))}
          </select>

          {/* Stats Box */}
          <div className="bg-sky-50 border border-sky-100 rounded-xl p-4 mt-6">
            <p className="text-gray-700 font-medium mb-2">Total Crops:</p>
            <p className="text-3xl font-bold text-sky-700">{crops.length}</p>
          </div>
        </aside>

        {/* ================= Main Content ================= */}
        <main className="lg:col-span-3">
          {/* Header */}
          <h2 className="text-3xl font-bold text-gray-700 mb-6">
            All Crops{" "}
            <span className="text-sky-500">({filteredCrops.length})</span>
          </h2>

          {filteredCrops.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              No crops found.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredCrops.map((crop) => (
                <CropCard key={crop._id} crop={crop} />
              ))}
            </div>
          )}
        </main>
      </div>
    </section>
  );
}
