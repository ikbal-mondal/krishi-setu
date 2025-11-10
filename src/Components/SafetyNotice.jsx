export default function SafetyNotice() {
  return (
    <div className="my-8 bg-gradient-to-r from-yellow-50 via-sky-100 to-yellow-50 border border-sky-200 rounded-2xl p-8 shadow-lg">
      {/* Heading */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-yellow-300/40 rounded-full shadow">
          <img
            src="https://cdn-icons-png.flaticon.com/512/564/564619.png"
            alt="warning"
            className="w-7"
          />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-sky-800">
          Safety & Awareness Guidelines
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="flex items-start gap-4 bg-white border border-yellow-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
          <img
            src="https://cdn-icons-png.flaticon.com/512/992/992683.png"
            className="w-8 mt-1"
            alt="scam alert"
          />
          <div>
            <h3 className="font-semibold text-gray-800 text-lg">
              Beware of Scammers
            </h3>
            <p className="text-gray-600 text-sm">
              Always stay alert. Some users may pretend to be buyers or sellers
              to scam you.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 bg-white border border-yellow-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1041/1041916.png"
            className="w-8 mt-1"
            alt="verify"
          />
          <div>
            <h3 className="font-semibold text-gray-800 text-lg">
              Verify Identity
            </h3>
            <p className="text-gray-600 text-sm">
              Confirm seller details before making payments or sharing crop
              information.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 bg-white border border-yellow-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2893/2893047.png"
            className="w-8 mt-1"
            alt="secure info"
          />
          <div>
            <h3 className="font-semibold text-gray-800 text-lg">
              Protect Your Information
            </h3>
            <p className="text-gray-600 text-sm">
              Never share OTP, bank details, password, or personal info with
              strangers.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 bg-white border border-yellow-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1828/1828843.png"
            className="w-8 mt-1"
            alt="report"
          />
          <div>
            <h3 className="font-semibold text-gray-800 text-lg">
              Report Suspicious Activity
            </h3>
            <p className="text-gray-600 text-sm">
              If something feels wrong or unsafe, report the user immediately.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm md:text-base text-gray-800 font-medium">
          🔒 Your safety is our priority — Stay informed. Stay secure. Stay
          smart.
        </p>
      </div>
    </div>
  );
}
