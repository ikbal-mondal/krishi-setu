import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

export default function AddCrop() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    type: "",
    pricePerUnit: "",
    unit: "",
    quantity: "",
    description: "",
    location: "",
    image: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return Swal.fire("Error", "You must be logged in.", "error");

    const {
      name,
      type,
      pricePerUnit,
      unit,
      quantity,
      description,
      location,
      image,
    } = form;

    if (
      !name ||
      !type ||
      !pricePerUnit ||
      !unit ||
      !quantity ||
      !description ||
      !location ||
      !image
    ) {
      return Swal.fire("Error", "All fields are required.", "error");
    }

    const cropData = {
      name,
      type,
      pricePerUnit: Number(pricePerUnit),
      unit,
      quantity: Number(quantity),
      description,
      location,
      image,
      owner: {
        ownerEmail: user.email,
        ownerName: user.displayName || "Farmer",
      },
    };

    try {
      setLoading(true);
      await api.post("/crops", cropData);
      Swal.fire("Success", "Crop added successfully!", "success");
      navigate("/my-posts");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to add crop.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-5xl mx-auto px-4 py-10">
      {/* Title Section */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900">Add New Crop</h2>
        <p className="text-gray-500 mt-2">
          Fill out the details below to post your crop listing 🌾
        </p>
      </div>

      {/* Form Container */}
      <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 font-semibold">Crop Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="input input-bordered w-full focus:border-sky-600"
              placeholder="e.g., Tomato"
            />
          </div>

          {/* Type */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 font-semibold">Crop Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="select select-bordered w-full focus:border-sky-600"
            >
              <option value="">Select Type</option>
              <option value="Vegetable">Vegetable</option>
              <option value="Fruit">Fruit</option>
              <option value="Grain">Grain</option>
              <option value="Pulse">Pulse</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Price */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 font-semibold">
              Price per Unit
            </label>
            <input
              type="number"
              name="pricePerUnit"
              value={form.pricePerUnit}
              onChange={handleChange}
              className="input input-bordered w-full focus:border-sky-600"
              placeholder="e.g., 50"
            />
          </div>

          {/* Unit */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 font-semibold">Unit</label>
            <select
              name="unit"
              value={form.unit}
              onChange={handleChange}
              className="select select-bordered w-full focus:border-sky-600"
            >
              <option value="">Select Unit</option>
              <option value="kg">Kg</option>
              <option value="ton">Ton</option>
              <option value="bag">Bag</option>
            </select>
          </div>

          {/* Quantity */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 font-semibold">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              className="input input-bordered w-full focus:border-sky-600"
              placeholder="e.g., 400"
            />
          </div>

          {/* Location */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 font-semibold">Location</label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              className="input input-bordered w-full focus:border-sky-600"
              placeholder="e.g., Nadia"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2 flex flex-col gap-1">
            <label className="text-gray-700 font-semibold">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="textarea textarea-bordered w-full focus:border-sky-600"
              rows="3"
              placeholder="Share more details about your crop..."
            ></textarea>
          </div>

          {/* Image URL */}
          <div className="md:col-span-2 flex flex-col gap-1">
            <label className="text-gray-700 font-semibold">Image URL</label>
            <input
              type="url"
              name="image"
              value={form.image}
              onChange={handleChange}
              className="input input-bordered w-full focus:border-sky-600"
              placeholder="Paste your crop image link"
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              disabled={loading}
              className="btn bg-sky-600 hover:bg-sky-700 text-white px-10 py-2 rounded-lg shadow-md"
            >
              {loading ? "Adding..." : "Add Crop"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
