import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import orppLogo from "../assets/orpp.png";
import { verifyOTP } from "../api";

function OTPPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("otp_email");
    if (savedEmail) setEmail(savedEmail);
  }, []);

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) inputs.current[index + 1].focus();
  };

  const handleVerify = async () => {
    const code = otp.join("");
    if (!email) {
      alert("Enter your email.");
      return;
    }
    if (code.length !== 6) {
      alert("Enter all 6 digits.");
      return;
    }
    try {
      const res = await verifyOTP(email, code);
      console.log("OTP verification response:", res);

      if (res.access_token) {
        localStorage.setItem("token", res.access_token);
        localStorage.setItem("refresh_token", res.refresh_token);
        localStorage.setItem("role", res.user.role.toLowerCase());
        localStorage.removeItem("otp_email");

        navigate(res.user.role.toLowerCase() === "admin" ? "/calendar" : "/view-calendar");
      } else {
        alert(res.message || "OTP verification failed.");
      }
    } catch (err) {
      alert("Verification failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f9ff]">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
        <img src={orppLogo} alt="ORPP Logo" className="h-20 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-4 text-blue-900">Enter OTP</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className="w-full px-4 py-2 mb-4 border border-blue-900 rounded"
        />
        <div className="flex justify-center gap-2 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              maxLength="1"
              ref={(el) => (inputs.current[index] = el)}
              className="w-12 h-12 text-center text-xl border border-blue-900 rounded"
            />
          ))}
        </div>
        <button
          onClick={handleVerify}
          className="w-full bg-[#002147] text-white font-semibold py-2 rounded hover:bg-blue-800 transition"
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
}

export default OTPPage;
