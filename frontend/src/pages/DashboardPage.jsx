import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getActivities } from "../activityApi";

function DashboardPage() {
  const [stats, setStats] = useState({ total: 0, ongoing: 0, completed: 0 });
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const loadStats = async () => {
    try {
      const data = await getActivities(token);
      const now = new Date();

      const total = data.length;
      const ongoing = data.filter(
        (a) => new Date(a.start_time) <= now && new Date(a.end_time) >= now
      ).length;
      const completed = data.filter((a) => new Date(a.end_time) < now).length;

      setStats({ total, ongoing, completed });
    } catch (error) {
      console.error("Failed to load stats:", error);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div className="p-8 bg-[#f4f9ff] min-h-screen">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">
        ORPP Activity Management Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Total Activities
          </h2>
          <p className="text-3xl font-bold text-blue-900">{stats.total}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Ongoing Activities
          </h2>
          <p className="text-3xl font-bold text-blue-900">{stats.ongoing}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Completed Activities
          </h2>
          <p className="text-3xl font-bold text-blue-900">{stats.completed}</p>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        {role === "admin" && (
          <button
            onClick={() => navigate("/calendar")}
            className="bg-[#002147] text-white font-semibold py-3 rounded hover:bg-blue-800 transition"
          >
            New Activity
          </button>
        )}

        {role === "admin" ? (
          <button
            onClick={() => navigate("/calendar")}
            className="bg-[#abc9e8] text-[#002147] font-semibold py-3 rounded hover:bg-blue-300 transition"
          >
            View Calendar
          </button>
        ) : (
          <button
            onClick={() => navigate("/view-calendar")}
            className="bg-[#abc9e8] text-[#002147] font-semibold py-3 rounded hover:bg-blue-300 transition"
          >
            View Calendar
          </button>
        )}

        {role === "admin" && (
          <button
            onClick={() => navigate("/users")}
            className="bg-[#abc9e8] text-[#002147] font-semibold py-3 rounded hover:bg-blue-300 transition"
          >
            Manage Users
          </button>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
