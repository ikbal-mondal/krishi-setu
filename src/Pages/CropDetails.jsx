import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
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
    <section className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-600 to-blue-500 rounded-xl p-6 md:p-10 text-white shadow-md mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{crop.name}</h1>
        <p className="text-lg capitalize">{crop.type}</p>
        <p className="mt-3 text-sm">
          📍 <span className="font-medium">{crop.location}</span>
        </p>
      </div>

      {/* Info Grid */}
      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Image */}
        <div>
          <img
            src={crop.image}
            alt={crop.name}
            className="rounded-xl w-full object-cover h-80 shadow-lg"
          />
        </div>

        {/* Info */}
        <div className="space-y-3">
          <p className="text-lg">
            <span className="font-semibold">Price:</span> ₹{crop.pricePerUnit}/
            {crop.unit}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Available Quantity:</span>{" "}
            {crop.quantity} {crop.unit}
          </p>
          <p>
            <span className="font-semibold">Description:</span>{" "}
            {crop.description}
          </p>
          <p>
            <span className="font-semibold">Posted By:</span>{" "}
            {crop.owner?.ownerName} ({crop.owner?.ownerEmail})
          </p>
        </div>
      </div>

      {/* Interest Form */}
      {!isOwner && (
        <div className="mt-12 bg-sky-50 border border-sky-200 rounded-xl p-6 shadow-md">
          <h3 className="text-2xl font-semibold text-sky-700 mb-4">
            🌾 Show Interest
          </h3>

          {hasSentInterest ? (
            <div className="text-sky-700 font-medium">
              ✅ You’ve already sent an interest for this crop.
            </div>
          ) : (
            <form onSubmit={handleSubmitInterest} className="space-y-4">
              <div>
                <label className="block font-semibold mb-1">Quantity</label>
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

              <div>
                <label className="block font-semibold mb-1">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="textarea textarea-bordered w-full"
                  rows="3"
                  placeholder="Optional message to the owner..."
                />
              </div>

              <div>
                <p className="font-medium text-gray-700">
                  💰 Total Price:{" "}
                  <span className="text-sky-700 font-semibold">
                    ₹{totalPrice || 0}
                  </span>
                </p>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn bg-sky-600 hover:bg-sky-700 text-white px-8"
              >
                {submitting ? "Submitting..." : "Submit Interest"}
              </button>
            </form>
          )}
        </div>
      )}

      {/* Received Interests (for Owner) */}
      {isOwner && (
        <div className="mt-14">
          <h3 className="text-2xl font-semibold text-sky-700 mb-4">
            📋 Received Interests
          </h3>

          {(!crop.interests || crop.interests.length === 0) && (
            <p className="text-gray-500">No interests received yet.</p>
          )}

          {crop.interests && crop.interests.length > 0 && (
            <div className="overflow-x-auto shadow-lg rounded-xl border border-gray-200">
              <table className="table w-full">
                <thead className="bg-sky-600 text-white">
                  <tr>
                    <th>Buyer Name</th>
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
                      <td className="capitalize font-medium">{i.status}</td>
                      <td>
                        {i.status === "pending" ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                handleInterestAction(i._id, "accepted")
                              }
                              className="btn btn-sm bg-green-500 text-white hover:bg-green-600"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() =>
                                handleInterestAction(i._id, "rejected")
                              }
                              className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className="text-gray-500 italic">-</span>
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
