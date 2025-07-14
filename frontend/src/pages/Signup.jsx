import { useState } from "react";
import { useNavigate } from "react-router-dom";
import orppLogo from "../assets/orpp.png";
import { Link } from "react-router-dom";
import { signup } from "../api";

function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    idNumber: "",
    department: "",
    password: "",
    confirmPassword: "",
  });

  const departments = [
    "Registration and Field Services Department",
    "Registration Section",
    "Field Services Section",
    "ICT Section",
    "Compliance and Regulation Department",
    "Compliance Section",
    "Political Parties Capacity Building Section",
    "Records Management Section",
    "Finance and Accounts Department",
    "Human Resource Management & Administration Department",
    "Planning, Research & Innovation Section",
    "Resource Centre Section",
    "Partnerships and Linkages Section",
    "Corporate Communications Unit",
    "Legal Services Unit",
    "Supply Chain Management Unit",
    "Internal Audit Unit",
    "Registrar’s Office"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const payload = {
      full_name: formData.fullName,
      email: formData.email,
      phone_number: formData.phone,
      id_number: formData.idNumber,
      department: formData.department,
      password: formData.password,
      role: "user",
    };

    try {
      const data = await signup(payload);
      if (data.message?.toLowerCase().includes("created")) {
        navigate("/login");
      } else {
        alert(data.message || "Signup failed.");
      }
    } catch (error) {
      alert("Signup error.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f9ff]">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md overflow-y-auto">
        <div className="flex justify-center mb-6">
          <img src={orppLogo} alt="ORPP Logo" className="h-20 w-auto" />
        </div>
        <h1 className="text-2xl font-bold text-center text-blue-900 mb-6">
          Create your ORPP Activity Account
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-blue-900 rounded"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-blue-900 rounded"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-blue-900 rounded"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">ID Number</label>
            <input
              type="text"
              name="idNumber"
              value={formData.idNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-blue-900 rounded"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-blue-900 rounded"
              required
            >
              <option value="">-- Select Department --</option>
              {departments.map((dept, index) => (
                <option key={index} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-blue-900 rounded"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-blue-900 rounded"
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
              Show passwords
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#002147] text-white font-semibold py-2 rounded hover:bg-blue-800 transition"
          >
            Create Account
          </button>

          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600 mr-1">Already registered?</span>
            <Link to="/login" className="text-blue-900 text-sm hover:underline">
              Log In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
