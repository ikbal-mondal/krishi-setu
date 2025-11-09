import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!user)
    return (
      <div className="text-center text-gray-700 py-20">
        Please login to view your profile.
      </div>
    );

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!displayName.trim() || !photoURL.trim()) {
      return Swal.fire("Error", "All fields are required.", "error");
    }

    try {
      setLoading(true);
      await updateProfile(user, { displayName, photoURL });
      setOpenModal(false);
      Swal.fire(
        "Profile Updated!",
        "Your profile information has been successfully updated.",
        "success"
      );
    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire("Error", "Failed to update your profile.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-14">
      <div className="bg-white border border-gray-100 shadow-xl rounded-2xl p-8 md:p-10">
        {/* ✅ Profile Header Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10">
          <div className="avatar">
            <div className="w-32 rounded-full ring ring-sky-500 ring-offset-base-100 ring-offset-2 overflow-hidden">
              <img
                src={photoURL || "/default-avatar.png"}
                alt={displayName || "User"}
              />
            </div>
          </div>

          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-800 mb-1">
              {user.displayName || "Unnamed User"}
            </h2>
            <p className="text-gray-500 mb-2">{user.email}</p>
            <p className="text-sm text-gray-400">
              Member since:{" "}
              {new Date(user.metadata.creationTime).toLocaleDateString()}
            </p>

            {/* ✅ Update Button */}
            <button
              onClick={() => setOpenModal(true)}
              className="btn bg-sky-600 hover:bg-sky-700 text-white mt-4 px-6"
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Edit Modal */}
      {openModal && (
        <dialog open className="modal">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-lg text-sky-600 mb-4">
              ✏️ Edit Profile Information
            </h3>

            {/* Preview image */}
            <div className="flex justify-center mb-6">
              <img
                src={photoURL || "/default-avatar.png"}
                alt="Profile Preview"
                className="w-24 h-24 rounded-full border-4 border-sky-400 shadow"
              />
            </div>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block font-semibold mb-1">Display Name</label>
                <input
                  type="text"
                  defaultValue={user?.displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">
                  Email (readonly)
                </label>
                <input
                  type="email"
                  defaultValue={user?.email}
                  className="input input-bordered w-full bg-gray-100 "
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Photo URL</label>
                <input
                  type="url"
                  defaultValue={user?.photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="Paste your profile photo URL"
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
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

          {/* Modal overlay (click outside to close) */}
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setOpenModal(false)}>close</button>
          </form>
        </dialog>
      )}
    </section>
  );
}
