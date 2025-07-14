import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import orppLogo from "../assets/orpp.png";
import { forgotPassword } from "../api";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await forgotPassword(email);
      alert(res.message);
      navigate("/reset-password", { state: { email } });
    } catch (err) {
      alert("Error sending reset link.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f9ff]">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img src={orppLogo} alt="ORPP Logo" className="h-20 w-auto" />
        </div>
        <h1 className="text-2xl font-bold text-center text-blue-900 mb-6">
          Forgot Password
        </h1>
        <p className="text-sm text-gray-600 mb-4 text-center">
          Enter your registered email and we'll send you an OTP to reset your password.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-blue-900 rounded"
              placeholder="you@example.com"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#002147] text-white font-semibold py-2 rounded hover:bg-blue-800 transition"
          >
            Send Reset OTP
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/login" className="text-sm text-blue-900 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
