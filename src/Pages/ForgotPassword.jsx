import { useState } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { sendPasswordResetEmail } from "firebase/auth";
import auth from "../firebase/firebase.config";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      return Swal.fire("Error", "Please enter your email address.", "error");
    }

    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      Swal.fire(
        "Email Sent!",
        "A password reset link has been sent to your email.",
        "success"
      );
      setEmail("");
    } catch (err) {
      console.error("❌ Reset Error:", err);
      Swal.fire(
        "Error",
        err.message || "Failed to send password reset email.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-gradient-to-br from-sky-100 to-blue-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 mx-4">
        <h2 className="text-3xl font-bold text-center text-sky-600 mb-2">
          Forgot Password?
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Enter your email address and we’ll send you a link to reset your
          password.
        </p>

        <form onSubmit={handleReset} className="space-y-5">
          <div>
            <label className="block font-semibold mb-1 text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn bg-sky-600 hover:bg-sky-700 text-white w-full"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="text-center mt-6">
          <Link
            to="/login"
            className="text-sky-600 hover:underline font-medium"
          >
            ← Back to Login
          </Link>
        </div>
      </div>
    </section>
  );
}
