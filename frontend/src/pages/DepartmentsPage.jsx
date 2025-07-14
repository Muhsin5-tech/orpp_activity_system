import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getActivities } from "../activityApi";

function DepartmentsPage() {
  const [activitiesByDepartment, setActivitiesByDepartment] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await getActivities(token);

        const grouped = {};
        data.forEach((activity) => {
          const dept = activity.department || "Unassigned";
          if (!grouped[dept]) grouped[dept] = [];
          grouped[dept].push(activity);
        });

        setActivitiesByDepartment(grouped);
      } catch (error) {
        console.error("Error loading activities:", error);
      }
    };

    fetchActivities();
  }, [token]);

  return (
    <div className="p-8 bg-[#f4f9ff] min-h-screen">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">
        ORPP Directorates & Departments
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(activitiesByDepartment).map(([department, activities]) => (
          <div key={department} className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              {department}
            </h2>

            <ul className="text-gray-700 list-disc pl-5 mb-4 space-y-1">
              {activities.map((activity) => (
                <li key={activity.id}>
                  <span className="font-medium">{activity.title}</span> <br />
                  <span className="text-sm text-gray-500">
                    {new Date(activity.start_time).toLocaleDateString()} — {new Date(activity.end_time).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => navigate("/calendar")}
              className="bg-[#002147] text-white py-2 px-4 rounded hover:bg-blue-800 transition"
            >
              View All Activities
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DepartmentsPage;
