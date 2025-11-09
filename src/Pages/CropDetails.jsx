import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

export default function CropDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [crop, setCrop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchCrop = async () => {
      try {
        const res = await api.get(`/crops/${id}`);
        setCrop(res.data);
      } catch (err) {
        console.error("❌ Error fetching crop:", err);
        setError("Failed to load crop details.");
      } finally {
        setLoading(false);
      }
    };
    fetchCrop();
  }, [id]);

  const isOwner = user && crop?.owner?.ownerEmail === user.email;

  const hasSentInterest =
    crop?.interests?.some((i) => i.userEmail === user?.email) || false;

  const totalPrice =
    quantity && crop?.pricePerUnit ? quantity * crop.pricePerUnit : 0;

  const handleSubmitInterest = async (e) => {
    e.preventDefault();
    if (!user)
      return Swal.fire(
        "Login Required",
        "Please login to send interest.",
        "info"
      );

    if (isOwner)
      return Swal.fire(
        "Not Allowed",
        "Owners cannot send interest.",
        "warning"
      );

    if (hasSentInterest)
      return Swal.fire(
        "Already Sent",
        "You have already sent an interest for this crop.",
        "info"
      );

    if (!quantity || quantity < 1)
      return Swal.fire(
        "Invalid Input",
        "Quantity must be greater than 0.",
        "error"
      );

    const confirm = await Swal.fire({
      title: "Confirm Interest?",
      html: `<p>You are showing interest for <b>${quantity}</b> ${crop.unit} of <b>${crop.name}</b>.<br>Total Price: <b>₹${totalPrice}</b></p>`,
      showCancelButton: true,
      confirmButtonText: "Yes, Submit",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#0284c7",
    });

    if (!confirm.isConfirmed) return;

    try {
      setSubmitting(true);
      await api.post(`/crops/${id}/interests`, {
        cropId: id,
        userEmail: user.email,
        userName: user.displayName || "User",
        quantity: Number(quantity),
        message: message || "",
        status: "pending",
      });

      Swal.fire("Success", "Interest submitted successfully!", "success");
      setQuantity("");
      setMessage("");
      // Refresh crop details to update interests
      const updated = await api.get(`/crops/${id}`);
      setCrop(updated.data);
    } catch (err) {
      console.error("Error submitting interest:", err);
      Swal.fire("Error", "Failed to submit interest.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleInterestAction = async (interestId, status) => {
    const confirm = await Swal.fire({
      title: `${status === "accepted" ? "Accept" : "Reject"} this request?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonColor: "#d33",
    });

    if (!confirm.isConfirmed) return;

    try {
      await api.put(`/crops/${id}/interests/${interestId}`, { status });
      Swal.fire("Updated", `Interest ${status}.`, "success");
      const updated = await api.get(`/crops/${id}`);
      setCrop(updated.data);
    } catch (err) {
      console.error("Error updating interest:", err);
      Swal.fire("Error", "Failed to update status.", "error");
    }
  };

  // Loading state
  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner loading-lg text-sky-600"></span>
      </div>
    );

  if (error || !crop)
    return (
      <div className="text-center text-red-600 py-20 font-medium">
        {error || "Crop not found."}
      </div>
    );
  return (
    <section className="max-w-7xl mx-auto px-3 md:px-4 py-8 md:py-12">
      {/* Back Button + Share Buttons */}
      <div className="flex flex-wrap justify-between items-center gap-3 mb-8">
        {/* Back To Home */}
        <Link
          to="/"
          className="flex items-center gap-2 text-sky-600 hover:text-sky-700 text-sm md:text-base"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/318/318276.png"
            className="w-4 md:w-5"
            alt="Back"
          />
          Back to Home
        </Link>

        {/* Share Buttons */}
        <div className="flex items-center gap-3">
          {/* WhatsApp Share */}
          <button
            onClick={() =>
              window.open(
                `https://wa.me/?text=Check out this crop on Krishi Setu: ${window.location.href}`,
                "_blank"
              )
            }
            className="p-2 bg-green-500 hover:bg-green-600 rounded-lg"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
              className="w-5 md:w-6"
              alt="WhatsApp"
            />
          </button>

          {/* Copy Link */}
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              Swal.fire("Copied!", "Link copied to clipboard.", "success");
            }}
            className="p-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE4QS7Y_Br_owcwcAnvKSypl-uNXUPQ4OlDg&s"
              className="w-5 md:w-6"
              alt="Copy"
            />
          </button>
        </div>
      </div>

      {/* Heading */}
      <div className="mb-8 md:mb-10">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
          {crop.name}
        </h1>
        <p className="text-sky-700 font-semibold flex items-center gap-2 text-lg capitalize mt-2">
          <span className="w-3 h-3 bg-sky-600 rounded-full"></span>
          {crop.type}
        </p>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
        {/* Sidebar */}
        <div className="lg:col-span-1 lg:sticky lg:top-24 lg:h-fit space-y-6">
          <div className="p-5 md:p-6 bg-white rounded-xl shadow border border-gray-100 space-y-6">
            {/* Price */}
            <div className="flex items-center gap-3">
              <div className="p-2 md:p-3 bg-sky-100 rounded-lg">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3082/3082031.png"
                  className="w-6 md:w-7"
                  alt="price"
                />
              </div>
              <div>
                <p className="text-sm text-gray-500">Price</p>
                <p className="text-lg md:text-xl font-bold text-gray-800">
                  ₹{crop.pricePerUnit}/{crop.unit}
                </p>
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-3">
              <div className="p-2 md:p-3 bg-green-100 rounded-lg">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/992/992651.png"
                  className="w-6 md:w-7"
                  alt="quantity"
                />
              </div>
              <div>
                <p className="text-sm text-gray-500">Available Quantity</p>
                <p className="text-lg font-semibold">
                  {crop.quantity} {crop.unit}
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3">
              <div className="p-2 md:p-3 bg-yellow-100 rounded-lg">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/535/535239.png"
                  className="w-6 md:w-7"
                  alt="location"
                />
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="text-lg font-semibold">{crop.location}</p>
              </div>
            </div>

            {/* Owner */}
            <div className="flex items-center gap-3">
              <div className="p-2 md:p-3 bg-purple-100 rounded-lg">
                <img
                  src="https://cdn-icons-png.freepik.com/512/8428/8428718.png"
                  className="w-7"
                  alt="owner"
                />
              </div>
              <div>
                <p className="text-sm text-gray-500">Posted By</p>
                <p className="text-lg font-semibold text-gray-800">
                  {crop.owner?.ownerName}
                </p>
                <p className="text-sm text-gray-500">
                  {crop.owner?.ownerEmail}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-1 lg:col-span-2 space-y-6">
          {/* Image */}
          <div className="rounded-2xl overflow-hidden shadow-md border">
            <img
              src={crop.image}
              alt={crop.name}
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>

          {/* Description */}
          <div className="p-5 md:p-6 bg-white border rounded-xl shadow">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Crop Description
            </h3>
            <p className="text-gray-600 leading-relaxed">{crop.description}</p>
          </div>
        </div>
      </div>

      {/* Interest Form */}
      {!isOwner && (
        <div className="mt-14 p-6 md:p-10 bg-white border rounded-2xl shadow-lg">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
            🌾 Show Your Interest
          </h2>

          {hasSentInterest ? (
            <div className="text-green-600 font-semibold text-lg">
              ✅ Your interest has already been submitted.
            </div>
          ) : (
            <form onSubmit={handleSubmitInterest} className="grid gap-6">
              {/* Quantity */}
              <div>
                <label className="font-semibold text-gray-700 mb-1 block">
                  Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="Enter quantity"
                  required
                />
              </div>

              {/* Message */}
              <div>
                <label className="font-semibold text-gray-700 mb-1 block">
                  Message
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="textarea textarea-bordered w-full"
                  placeholder="Write a message..."
                />
              </div>

              <div className="text-lg font-semibold">
                Total Price:
                <span className="text-sky-600 ml-2">₹{totalPrice || 0}</span>
              </div>

              <button
                type="submit"
                className="btn bg-sky-600 hover:bg-sky-700 text-white w-full sm:w-auto"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit Interest"}
              </button>
            </form>
          )}
        </div>
      )}

      {/* Owner Interests */}
      {isOwner && (
        <div className="mt-14 bg-white border rounded-2xl shadow-lg p-5 md:p-10">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
            📥 Received Interests
          </h3>

          {!crop.interests || crop.interests.length === 0 ? (
            <p className="text-gray-500">No interests received yet.</p>
          ) : (
            <div className="overflow-x-auto border rounded-xl shadow">
              <table className="table text-sm md:text-base">
                <thead className="bg-sky-600 text-white">
                  <tr>
                    <th>Buyer</th>
                    <th>Quantity</th>
                    <th>Message</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {crop.interests.map((i) => (
                    <tr key={i._id}>
                      <td>{i.userName}</td>
                      <td>
                        {i.quantity} {crop.unit}
                      </td>
                      <td>{i.message || "-"}</td>
                      <td className="capitalize">{i.status}</td>
                      <td>
                        {i.status === "pending" ? (
                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={() =>
                                handleInterestAction(i._id, "accepted")
                              }
                              className="btn btn-xs bg-green-600 text-white"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() =>
                                handleInterestAction(i._id, "rejected")
                              }
                              className="btn btn-xs bg-red-600 text-white"
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
