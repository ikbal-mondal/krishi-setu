import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";

import { updateProfile } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
export default function Register() {
  const { createUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    photo: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //  password validation
  const validatePassword = (password) => {
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const isLength = password.length >= 6;
    return hasUpper && hasLower && isLength;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, photo, password } = form;

    if (!name || !email || !photo || !password) {
      return Swal.fire("Error", "Please fill out all fields.", "error");
    }
    if (!validatePassword(password)) {
      return Swal.fire(
        "Weak Password",
        "Password must contain at least one uppercase, one lowercase letter and be 6 characters long.",
        "warning"
      );
    }

    try {
      setLoading(true);
      const userCredential = await createUser(email, password);
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: photo,
      });
      Swal.fire("Welcome!", "Account created successfully!", "success");
      navigate("/");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", err.message || "Registration failed", "error");
    } finally {
      setLoading(false);
    }
  };

  //  Google login
  const handleGoogle = async () => {
    try {
      await signInWithGoogle("google");
      Swal.fire("Welcome!", "Google login successful!", "success");
      navigate("/");
    } catch (err) {
      Swal.fire("Error", "Google login failed.", "error");
    }
  };

  return (
    <div className="my-8 flex items-center justify-center p-6">
      <title> Register | Krishi-Setu </title>
      <div className="bg-white shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row max-w-5xl w-full">
        {/* Left side - Illustration */}
        <div className="md:w-1/2 bg-sky-600 text-white flex flex-col justify-center items-center p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-sky-700/20 blur-3xl"></div>
          <div className="z-10 text-center">
            <img
              src="https://i.ibb.co/6Rf9f6kf/krishi-setu-logo.png"
              alt="Krishi Setu Logo"
              className="w-24 mx-auto rounded mb-4 animate-pulse"
            />
            <h2 className="text-3xl font-bold mb-3">Join Krishi Setu</h2>
            <p className="text-sky-100">
              Connect with farmers, traders, and agri-enthusiasts. Grow your
              agro-network today
            </p>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Create Your Account
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="input input-bordered w-full focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="input input-bordered w-full focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Photo URL
              </label>
              <input
                type="url"
                name="photo"
                value={form.photo}
                onChange={handleChange}
                placeholder="https://your-photo.com/pic.jpg"
                className="input input-bordered w-full focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••"
                  className="input input-bordered w-full pr-10 focus:border-sky-500"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2 text-gray-600 hover:text-gray-800"
                >
                  {showPassword ? (
                    <AiFillEyeInvisible size={22} />
                  ) : (
                    <AiFillEye size={22} />
                  )}
                </button>
              </div>

              <small className="text-gray-500 text-xs">
                Must include 1 uppercase, 1 lowercase, and at least 6
                characters.
              </small>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-semibold transition duration-200"
            >
              {loading ? "Creating Account..." : "Register"}
            </button>
          </form>

          {/* Google sign-in */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm mb-2">Or continue with</p>
            <button
              onClick={handleGoogle}
              className="flex items-center justify-center gap-2 w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition"
            >
              <FcGoogle className="text-xl" />
              <span>Continue with Google</span>
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-sky-600 font-semibold hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
