import { useContext, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { FiMenu, FiX } from "react-icons/fi";

export default function Header() {
  const { user, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOutUser();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-sky-200 font-semibold border-b-2 border-white pb-1"
      : "hover:text-sky-100 transition-colors";

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className={navLinkClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/all-crops" className={navLinkClass}>
          All Crops
        </NavLink>
      </li>

      <>
        <li>
          <NavLink to="/add-crop" className={navLinkClass}>
            Add Crop
          </NavLink>
        </li>
        <li>
          <NavLink to="/my-posts" className={navLinkClass}>
            My Posts
          </NavLink>
        </li>
        <li>
          <NavLink to="/my-interests" className={navLinkClass}>
            My Interests
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" className={navLinkClass}>
            Profile
          </NavLink>
        </li>
      </>
    </>
  );

  return (
    <nav className="sticky top-0 z-50 bg-sky-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo and Brand */}
        <Link
          to="/"
          className="flex items-center gap-2 text-white font-bold text-xl"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/2906/2906459.png"
            alt="Krishi Setu Logo"
            className="w-8 h-8"
          />
          <span>Krishi Setu</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 items-center text-white font-medium">
          {navLinks}
          {!user ? (
            <>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-white text-sky-600 px-3 py-1 rounded-md font-semibold shadow-md"
                      : "hover:bg-white hover:text-sky-600 px-3 py-1 rounded-md transition-all"
                  }
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-white text-sky-600 px-3 py-1 rounded-md font-semibold shadow-md"
                      : "hover:bg-white hover:text-sky-600 px-3 py-1 rounded-md transition-all"
                  }
                >
                  Register
                </NavLink>
              </li>
            </>
          ) : (
            <li>
              <button
                onClick={handleLogout}
                className="bg-white text-sky-600 font-semibold px-3 py-1 rounded-md shadow hover:bg-sky-50 transition-all"
              >
                Logout
              </button>
            </li>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white text-sky-700 shadow-inner">
          <ul className="flex flex-col gap-2 px-6 py-4 text-base font-medium">
            {navLinks}
            {!user ? (
              <>
                <li>
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 hover:text-sky-500"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 hover:text-sky-500"
                  >
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="w-full text-left py-2 font-semibold hover:text-sky-500"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
