import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
export default function Login() {
  const { loginUser, signInWithGoogle } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    if (!email || !password)
      return Swal.fire("Error", "All fields are required!", "error");

    try {
      setLoading(true);
      await loginUser(email, password);
      Swal.fire("Welcome Back!", "Login successful.", "success");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      Swal.fire("Error", err.message || "Failed to login", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
      Swal.fire("Welcome!", "Logged in with Google successfully.", "success");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      Swal.fire("Error", err.message || "Google Sign-In failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex justify-center py-16 items-center min-h-screen bg-gradient-to-br from-sky-100 to-blue-50">
      <title> Login | Krishi-Setu </title>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 mx-4">
        <img
          src="https://i.ibb.co/6Rf9f6kf/krishi-setu-logo.png"
          alt="Krishi Setu Logo"
          className="w-24 mx-auto rounded mb-4"
        />
        <h2 className="text-3xl font-bold text-center text-sky-600 mb-6">
          Login to Your Account
        </h2>

        <form onSubmit={handleLogin} className="space-y-3">
          {/* Email */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700">
              Enter Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700">
              Enter Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                className="input input-bordered w-full pr-10"
                required
              />

              <button
                type="button"
                className="absolute right-3 top-2.5 text-gray-600 hover:text-gray-800"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiFillEyeInvisible size={20} />
                ) : (
                  <AiFillEye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-left text-sm text-sky-600 hover:underline">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn bg-sky-600 hover:bg-sky-700 text-white w-full"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-3 text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="btn btn-outline w-full flex items-center justify-center gap-2"
        >
          <FcGoogle className="text-xl" />
          Continue with Google
        </button>

        {/* Register Redirect */}
        <p className="text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-sky-600 font-medium hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </section>
  );
}
