import React, { useState } from "react";
import { Zap } from "lucide-react";

const LoginForm = ({ onLogin, onShowRegister, message }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    // Check localStorage for registered user
    const storedUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];

const matchedUser = storedUsers.find(
  (user) => user.email === email && user.password === password
);

if (matchedUser) {
  onLogin();
} else {
  setError("Invalid email or password");
}

  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <Zap className="text-white w-8 h-8" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Login to Solar Monitor</h2>

        {message && <p className="text-green-600 text-sm text-center mb-4">{message}</p>}
        {error && <p className="text-red-600 text-sm text-center mb-4">{error}</p>}

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyPress}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyPress}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold transition-colors"
          >
            LOGIN
          </button>
        </div>

        <div className="flex justify-between mt-4 text-sm text-blue-600">
          <button onClick={onShowRegister} className="hover:text-blue-800">
            Register
          </button>
          <button className="hover:text-blue-800">Forgot password?</button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
