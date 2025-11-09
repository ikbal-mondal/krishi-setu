import { useEffect, useState, useContext } from "react";
import { Link } from "react-router";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function MyInterests() {
  const { user } = useContext(AuthContext);
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("latest");

  useEffect(() => {
    if (!user) return;
    const fetchInterests = async () => {
      try {
        const res = await api.get("/my-interests");
        setInterests(res.data || []);
      } catch (err) {
        console.error("❌ Error fetching interests:", err);
        setError("Failed to load interests.");
      } finally {
        setLoading(false);
      }
    };
    fetchInterests();
  }, [user]);

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    if (value === "latest") {
      setInterests(
        [...interests].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      );
    } else if (value === "status") {
      setInterests(
        [...interests].sort((a, b) => a.status.localeCompare(b.status))
      );
    }
  };

  if (!user)
    return (
      <div className="text-center text-gray-700 py-20">
        Please login to view your interests.
      </div>
    );

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner loading-lg text-sky-600"></span>
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-600 font-medium py-20">{error}</div>
    );

  if (interests.length === 0)
    return (
      <div className="text-center py-20 text-gray-500">
        You haven’t shown interest in any crops yet.
      </div>
    );

  return (
    <section className="max-w-6xl mx-auto px-4 py-14">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold text-gray-800">💬 My Interests</h2>
        <div>
          <label className="mr-2 font-medium text-gray-700">Sort by:</label>
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="select select-bordered"
          >
            <option value="latest">Latest</option>
            <option value="status">Status</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto shadow-lg rounded-xl border border-gray-200">
        <table className="table w-full">
          <thead className="bg-sky-600 text-white">
            <tr>
              <th>Crop</th>
              <th>Owner</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {interests.map((item) => (
              <tr key={item._id}>
                <td>
                  <Link
                    to={`/crops/${item.cropId}`}
                    className="text-sky-600 font-semibold hover:underline"
                  >
                    {item.cropName || "Unknown Crop"}
                  </Link>
                </td>
                <td>{item.ownerName}</td>
                <td>{item.quantity}</td>
                <td>₹{item.totalPrice}</td>
                <td
                  className={`capitalize font-medium ${
                    item.status === "accepted"
                      ? "text-green-600"
                      : item.status === "rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {item.status}
                </td>
                <td>{item.message || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
