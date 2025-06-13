import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSendOTP = () => {
    if (!email) {
      alert("Please enter your email ID.");
      return;
    }
    // Add your OTP send logic here
    alert(`OTP sent to ${email}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter your Email ID"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 mb-4"
        />

        <button
          onClick={handleSendOTP}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-colors"
        >
          Send OTP
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
