import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import orppLogo from "../assets/orpp.png";
import { resetPassword } from "../api";

function ResetPassword() {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await resetPassword(email, otp, newPassword);
      alert(res.message);
      navigate("/login");
    } catch (err) {
      alert("Reset failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f9ff]">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img src={orppLogo} alt="ORPP Logo" className="h-20 w-auto" />
        </div>
        <h1 className="text-2xl font-bold text-center text-blue-900 mb-6">
          Reset Password
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-2 border border-blue-900 rounded"
              placeholder="Enter OTP"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border border-blue-900 rounded"
              placeholder="••••••••"
              required
            />
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="showPassword"
              className="mr-2"
              onChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor="showPassword" className="text-sm text-gray-700">
              Show password
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-[#002147] text-white font-semibold py-2 rounded hover:bg-blue-800 transition"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
