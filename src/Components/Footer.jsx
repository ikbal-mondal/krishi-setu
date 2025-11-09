import { Link } from "react-router";
import { FaFacebook, FaYoutube, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-sky-600 text-white ">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <img
              src="https://i.ibb.co/ZpPh5F9N/krishi-setu-logo.jpg"
              alt="Krishi Setu logo"
              className="w-24 h-12 rounded"
            />
            <h2 className="text-2xl font-bold">Krishi Setu</h2>
          </div>
          <p className="text-sky-100 leading-relaxed text-sm">
            A digital bridge connecting farmers, traders, and consumers. Grow,
            connect, and collaborate — all in one place.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3 border-b border-sky-300 pb-1">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-sky-200 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/crops"
                className="hover:text-sky-200 transition-colors"
              >
                All Crops
              </Link>
            </li>
            <li>
              <Link
                to="/add-crop"
                className="hover:text-sky-200 transition-colors"
              >
                Add Crop
              </Link>
            </li>
            <li>
              <Link
                to="/my-posts"
                className="hover:text-sky-200 transition-colors"
              >
                My Posts
              </Link>
            </li>
            <li>
              <Link
                to="/my-interests"
                className="hover:text-sky-200 transition-colors"
              >
                My Interests
              </Link>
            </li>
          </ul>
        </div>

        {/* Social & Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3 border-b border-sky-300 pb-1">
            Connect With Us
          </h3>
          <div className="flex gap-4 text-2xl mb-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-sky-200 transition"
            >
              <FaFacebook />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-sky-200 transition"
            >
              <FaYoutube />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-sky-200 transition"
            >
              <FaXTwitter />
            </a>
          </div>
          <p className="text-sm text-sky-100">
            Email:{" "}
            <a
              href="mailto:support@krishisetu.com"
              className="underline hover:text-sky-200"
            >
              support@krishisetu.com
            </a>
          </p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-sky-500 py-4 text-center text-sm text-sky-100 bg-sky-700">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-white">Krishi Setu</span>. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
}
