import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";
import orppLogo from "../assets/orpp.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login(email, password);
      if (res.access_token) {
        localStorage.setItem("token", res.access_token);
        localStorage.setItem("role", res.user.role.toLowerCase());
        navigate(res.user.role.toLowerCase() === "admin" ? "/calendar" : "/view-calendar");
      } else if (res.message === "OTP sent to your email.") {
        localStorage.setItem("otp_email", email);
        navigate("/verify-otp");
      } else {
        alert(res.message || "Login failed");
      }
    } catch (err) {
      alert(err.message || "Login error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f9ff]">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img src={orppLogo} alt="ORPP Logo" className="h-20 w-auto" />
        </div>
        <h1 className="text-2xl font-bold text-center text-blue-900 mb-6">
          Login to ORPP Activities
        </h1>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-blue-900 px-4 py-2 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full border border-blue-900 px-4 py-2 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#002147] text-white font-semibold py-2 rounded hover:bg-blue-800"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          New here?{" "}
          <span
            className="text-blue-800 cursor-pointer font-semibold"
            onClick={() => navigate("/signup")}
          >
            Create an account
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
