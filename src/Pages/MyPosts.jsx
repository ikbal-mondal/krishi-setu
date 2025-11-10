import { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";

export default function MyPosts() {
  const { user } = useContext(AuthContext);
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) return;

    const fetchMyCrops = async () => {
      try {
        const res = await api.get("/my-posts");
        setCrops(res.data || []);
      } catch (err) {
        console.error(" Error fetching my posts:", err);
        Swal.fire("Error", "Failed to load your crops.", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchMyCrops();
  }, [user]);

  // Handle Delete Crop
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this crop?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
    });

    if (!confirm.isConfirmed) return;

    try {
      await api.delete(`/crops/${id}`);
      setCrops((prev) => prev.filter((crop) => crop._id !== id));
      Swal.fire("Deleted!", "Your crop has been deleted.", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to delete crop.", "error");
    }
  };

  // Handle Update Crop
  const handleEdit = (crop) => setSelectedCrop(crop);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedCrop = {
      name: form.name.value,
      type: form.type.value,
      pricePerUnit: Number(form.pricePerUnit.value),
      unit: form.unit.value,
      quantity: Number(form.quantity.value),
      description: form.description.value,
      location: form.location.value,
      image: form.image.value,
    };

    try {
      await api.put(`/crops/${selectedCrop._id}`, updatedCrop);
      Swal.fire(
        "Updated!",
        "Crop information updated successfully!",
        "success"
      );

      // Update UI
      setCrops((prev) =>
        prev.map((c) =>
          c._id === selectedCrop._id ? { ...c, ...updatedCrop } : c
        )
      );

      setSelectedCrop(null);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update crop.", "error");
    }
  };

  if (!user)
    return (
      <div className="text-center py-20 text-gray-700">
        Please login to view your posts.
      </div>
    );

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner loading-lg text-sky-600"></span>
      </div>
    );

  return (
    <section className="max-w-7xl mx-auto px-4 py-14">
      {crops.length === 0 ? (
        ""
      ) : (
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
           My Posted Crops
        </h2>
      )}

      {crops.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4072/4072054.png"
            alt="no crops"
            className="w-40 opacity-80 mb-6"
          />

          <h3 className="text-2xl font-semibold text-gray-700 mb-2">
            No Crops Posted Yet 
          </h3>

          <p className="text-gray-500 max-w-md">
            Start by posting your first crop so buyers can find your produce
            easily. Adding crops regularly increases visibility and trust.
          </p>

          <button
            onClick={() => navigate("/add-crop")}
            className="mt-6 px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-lg shadow-md"
          >
            + Add Your First Crop
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto border border-gray-200 shadow-lg rounded-xl">
          <table className="table w-full">
            <thead className="bg-sky-600 text-white">
              <tr>
                <th>Crop</th>
                <th>Type</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {crops.map((crop) => (
                <tr
                  key={crop._id}
                  className="hover:bg-sky-50 transition duration-150"
                >
                  {/*  Crop Image + Name */}
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-14 h-14">
                          <img
                            src={crop.image}
                            alt={crop.name}
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">
                          {crop.name}
                        </div>
                        <div className="text-sm text-gray-500">{crop.unit}</div>
                      </div>
                    </div>
                  </td>

                  <td className="capitalize">{crop.type}</td>

                  <td className="text-gray-700 font-medium">
                    ₹{crop.pricePerUnit}/{crop.unit}
                  </td>

                  <td>
                    {crop.quantity} {crop.unit}
                  </td>

                  <td>{crop.location}</td>

                  <td>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(crop)}
                        className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(crop._id)}
                        className="btn btn-sm bg-red-500 hover:bg-red-600 text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/*  Edit Modal */}
      {selectedCrop && (
        <dialog id="editModal" open className="modal">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-lg text-sky-600 mb-4">
              ✏️ Edit Crop Information
            </h3>

            <form onSubmit={handleUpdate} className="grid grid-cols-2 gap-4">
              <input
                name="name"
                defaultValue={selectedCrop.name}
                placeholder="Name"
                className="input input-bordered w-full col-span-2"
                required
              />

              <select
                name="type"
                defaultValue={selectedCrop.type}
                className="select select-bordered w-full"
              >
                <option value="Vegetable">Vegetable</option>
                <option value="Fruit">Fruit</option>
                <option value="Grain">Grain</option>
                <option value="Pulse">Pulse</option>
                <option value="Other">Other</option>
              </select>

              <input
                type="number"
                name="pricePerUnit"
                defaultValue={selectedCrop.pricePerUnit}
                className="input input-bordered w-full"
                placeholder="Price per Unit"
                required
              />

              <select
                name="unit"
                defaultValue={selectedCrop.unit}
                className="select select-bordered w-full"
              >
                <option value="kg">kg</option>
                <option value="ton">ton</option>
                <option value="bag">bag</option>
              </select>

              <input
                type="number"
                name="quantity"
                defaultValue={selectedCrop.quantity}
                className="input input-bordered w-full"
                placeholder="Quantity"
                required
              />

              <input
                name="location"
                defaultValue={selectedCrop.location}
                className="input input-bordered w-full"
                placeholder="Location"
                required
              />

              <input
                name="image"
                defaultValue={selectedCrop.image}
                className="input input-bordered w-full col-span-2"
                placeholder="Image URL"
                required
              />

              <textarea
                name="description"
                defaultValue={selectedCrop.description}
                className="textarea textarea-bordered w-full col-span-2"
                rows="3"
                placeholder="Description"
              ></textarea>

              <div className="col-span-2 flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setSelectedCrop(null)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button type="submit" className="btn bg-sky-600 text-white">
                  Update
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </section>
  );
}
