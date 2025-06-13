import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const ResetPassword = () => {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reenterPassword, setReenterPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showReenterPassword, setShowReenterPassword] = useState(false);

  const handleSubmit = () => {
    if (!otp || !newPassword || !reenterPassword) {
      alert("Please fill all fields.");
      return;
    }

    if (newPassword !== reenterPassword) {
      alert("Passwords do not match.");
      return;
    }

    // You can add API call or localStorage update logic here
    alert("Password successfully reset!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Forgot Password</h2>

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
        />

        {/* New Password */}
        <div className="relative mb-4">
          <input
            type={showNewPassword ? "text" : "password"}
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-orange-600"
          >
            {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Re-enter Password */}
        <div className="relative mb-4">
          <input
            type={showReenterPassword ? "text" : "password"}
            placeholder="Re-enter New Password"
            value={reenterPassword}
            onChange={(e) => setReenterPassword(e.target.value)}
            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
          <button
            type="button"
            onClick={() => setShowReenterPassword(!showReenterPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-orange-600"
          >
            {showReenterPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
