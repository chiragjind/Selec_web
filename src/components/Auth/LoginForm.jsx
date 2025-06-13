import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import SelecIcon from '../../Assets/selec-logo.png'; // Make sure this path is correct
import { Link } from "react-router-dom";


const LoginForm = ({ onLogin, onShowRegister, message }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    setError("");
    if (!email || !password) {
      setError("Please enter both username and password");
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    const matchedUser = storedUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (matchedUser) {
      onLogin();
    } else {
      setError("Invalid username or password");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        {/* Logo and Heading */}
        <div className="flex flex-col items-center mb-6">
          <img src={SelecIcon}
               alt="Selec Logo"
               className="w-28 h-28 mb-4 object-contain"
          />
          <h2 className="text-2xl font-bold text-gray-800 mt-2">Selec Controls</h2>
        </div>

        {/* Message / Error */}
        {message && <p className="text-green-600 text-sm text-center mb-2">{message}</p>}
        {error && <p className="text-red-600 text-sm text-center mb-2">{error}</p>}

        {/* Form Inputs */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Please Enter Your Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyPress}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Please Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-orange-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Links */}
        <div className="flex justify-between items-center mt-4 text-sm text-orange-700">
            <Link to="/forgot-password" className="hover:underline">
                Forgot password?
            </Link>
            <button onClick={onShowRegister} className="hover:underline">
                Register to create a new account?
            </button>
        </div>


        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-colors"
        >
          LOGIN
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
