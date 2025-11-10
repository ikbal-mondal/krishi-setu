import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

export default function Profile() {
  const { user, signOutUser } = useContext(AuthContext);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // If not logged in
  if (!user)
    return (
      <div className="text-center text-gray-700 py-20">
        Please login to view your profile.
      </div>
    );

  const handleLogout = async () => {
    try {
      await signOutUser();
      navigate("/");
      Swal.fire(
        "Logged Out",
        "You have been logged out successfully!",
        "success"
      );
    } catch (error) {
      Swal.fire("Error", "Logout failed!", "error");
    }
  };

  // ✅ Update Profile
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!displayName.trim() || !photoURL.trim()) {
      return Swal.fire("Error", "All fields are required.", "error");
    }

    try {
      setLoading(true);
      await updateProfile(user, { displayName, photoURL });
      setOpenModal(false);

      Swal.fire("Updated!", "Your profile has been updated!", "success");
    } catch (error) {
      Swal.fire("Error", "Failed to update profile", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      {/* Banner */}
      <div className="h-36 md:h-48 bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-500 rounded-xl shadow-lg mb-14"></div>

      {/* Profile Card */}
      <div className="relative bg-white shadow-xl border border-gray-100 rounded-2xl p-8 pb-12 -mt-20">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Profile Image */}
          <div className="relative -mt-20">
            <img
              src={photoURL || "/default-avatar.png"}
              alt="Profile"
              className="w-40 h-40 rounded-full border-4 border-white shadow-xl object-cover"
            />
          </div>

          {/* User Info */}
          <div className="text-center md:text-left flex-1">
            <h2 className="text-3xl font-bold text-gray-600">
              Hi,{" "}
              <span className="text-sky-500">{user.displayName || "User"}</span>
            </h2>

            <p className="text-gray-500 text-lg">{user.email}</p>

            <p className="text-sm text-gray-400 mt-1">
              Member since:{" "}
              <span className="font-medium">
                {new Date(user.metadata.creationTime).toLocaleDateString()}
              </span>
            </p>

            {/* Buttons */}
            <div className="flex gap-4 mt-6 justify-center md:justify-start">
              <button
                onClick={() => setOpenModal(true)}
                className="btn bg-sky-600 hover:bg-sky-700 text-white px-8 rounded-lg shadow-md"
              >
                Edit Profile
              </button>

              <button
                onClick={handleLogout}
                className="btn bg-red-500 hover:bg-red-600 text-white px-8 rounded-lg shadow-md"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {openModal && (
        <dialog open className="modal">
          <div className="modal-box rounded-xl shadow-xl border border-gray-200">
            <h3 className="text-2xl font-semibold text-sky-700 mb-4">
              ✏️ Edit Profile
            </h3>

            <div className="flex justify-center mb-6">
              <img
                src={photoURL || "/default-avatar.png"}
                className="w-24 h-24 rounded-full border-4 border-sky-500 shadow"
                alt="Preview"
              />
            </div>

            <form onSubmit={handleUpdate} className="space-y-5">
              {/* Name */}
              <div>
                <label className="font-semibold block mb-1">Display Name</label>
                <input
                  type="text"
                  defaultValue={user?.displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="input input-bordered w-full"
                />
              </div>

              {/* Email */}
              <div>
                <label className="font-semibold block mb-1">Email</label>
                <input
                  type="email"
                  disabled
                  defaultValue={user?.email}
                  className="input input-bordered w-full bg-gray-100"
                />
              </div>

              {/* Photo */}
              <div>
                <label className="font-semibold block mb-1">Photo URL</label>
                <input
                  type="url"
                  defaultValue={user?.photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  className="input input-bordered w-full"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn bg-sky-600 hover:bg-sky-700 text-white"
                >
                  {loading ? "Updating..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>

          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setOpenModal(false)}></button>
          </form>
        </dialog>
      )}
    </section>
  );
}
