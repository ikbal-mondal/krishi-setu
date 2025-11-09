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
    <section className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8 my-10">
      <h2 className="text-2xl font-bold text-sky-600 mb-6 text-center">
        Add New Crop
      </h2>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block font-semibold mb-1">Crop Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="e.g., Tomato"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Crop Type</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="">Select Type</option>
            <option value="Vegetable">Vegetable</option>
            <option value="Fruit">Fruit</option>
            <option value="Grain">Grain</option>
            <option value="Pulse">Pulse</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Price per Unit</label>
          <input
            type="number"
            name="pricePerUnit"
            value={form.pricePerUnit}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="e.g., 50"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Unit</label>
          <select
            name="unit"
            value={form.unit}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="">Select Unit</option>
            <option value="kg">Kg</option>
            <option value="ton">Ton</option>
            <option value="bag">Bag</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="e.g., 400"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="e.g., Nadia"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            placeholder="Describe your crop details..."
            rows="3"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block font-semibold mb-1">Image URL</label>
          <input
            type="url"
            name="image"
            value={form.image}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Paste crop image URL"
          />
        </div>

        <div className="md:col-span-2 flex justify-center mt-4">
          <button
            type="submit"
            disabled={loading}
            className="btn bg-sky-600 hover:bg-sky-700 text-white px-8"
          >
            {loading ? "Adding..." : "Add Crop"}
          </button>
        </div>
      </form>
    </section>
  );
}
