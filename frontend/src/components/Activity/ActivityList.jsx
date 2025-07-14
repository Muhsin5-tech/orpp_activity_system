import { useEffect, useState } from "react";
import { getActivities, deleteActivity } from "../activityApi";

function ActivityList({ token }) {
  const [activities, setActivities] = useState([]);

  const fetchActivities = async () => {
    const data = await getActivities(token);
    setActivities(data);
  };

  const handleDelete = async (id) => {
    try {
      await deleteActivity(id, token);
      fetchActivities();
    } catch (err) {
      alert("Failed to delete");
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <div className="p-6 bg-white rounded shadow mt-6">
      <h2 className="text-xl font-semibold mb-4 text-blue-900">Activities</h2>
      <ul className="space-y-2">
        {activities.map((activity) => (
          <li key={activity.id} className="border p-3 rounded flex justify-between items-center">
            <div>
              <strong>{activity.title}</strong>
              <p className="text-sm text-gray-600">{activity.venue}</p>
            </div>
            <button
              onClick={() => handleDelete(activity.id)}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ActivityList;
