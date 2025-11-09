import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function MyInterests() {
  const { user } = useContext(AuthContext);
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) return;
    const fetchInterests = async () => {
      try {
        const res = await api.get("/my-interests");
        setInterests(res.data || []);
      } catch (err) {
        console.error(" Error fetching interests:", err);
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
      <div className=" max-w-4xl  mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 py-16">
        {/* LEFT — Empty State Illustration & CTA */}
        <div className="flex flex-col mx-4 justify-center text-center md:text-left items-center md:items-start">
          <h3 className="text-3xl font-semibold text-gray-800 mb-3">
            No Interests Yet 🌱
          </h3>

          <p className="text-gray-600 leading-relaxed max-w-md">
            You haven’t shown interest in any crops yet. Explore available crops
            and start connecting with farmers today.
          </p>

          <button
            onClick={() => navigate("/all-crops")}
            className="mt-6 px-8 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-lg shadow-lg transition-all duration-300"
          >
            Browse Crops
          </button>
        </div>

        {/* RIGHT — Help/Instruction Box */}
        <div className="bg-white p-6 mx-2 rounded-xl border border-gray-200 shadow-md">
          <div className="flex gap-4 items-start">
            {/* Icon */}
            <div className="p-3 bg-sky-100 rounded-full flex items-center justify-center shadow-sm">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2983/2983781.png"
                className="w-9"
                alt="help icon"
              />
            </div>

            {/* Content */}
            <div>
              <h3 className="text-xl font-bold text-sky-700 mb-2">
                How to Send Interest?
              </h3>

              <p className="text-gray-600">Follow these easy steps:</p>

              <ul className="mt-4 space-y-2 text-gray-700">
                <li className="flex gap-2">
                  ✅ Open the <b>All Crops</b> page.
                </li>
                <li className="flex gap-2">
                  ✅ Click on any crop to view full details.
                </li>
                <li className="flex gap-2">
                  ✅ Scroll down to <b>Show Your Interest</b>.
                </li>
                <li className="flex gap-2">✅ Enter the quantity.</li>
                <li className="flex gap-2">✅ Add an optional message.</li>
                <li className="flex gap-2">
                  ✅ Hit <b>Submit Interest</b>.
                </li>
              </ul>

              <p className="text-gray-600 mt-4">
                The owner will receive your request and may accept or reject it.
              </p>
            </div>
          </div>
        </div>
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
