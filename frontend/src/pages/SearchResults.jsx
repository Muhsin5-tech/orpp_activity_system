import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchActivities } from "../api";

function SearchResults() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = new URLSearchParams(useLocation().search).get("q");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await searchActivities(query, token);
        setResults(data);
      } catch (error) {
        console.error("Error fetching activities:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    if (query) fetchResults();
  }, [query]);

  return (
    <div className="p-8 bg-[#f4f9ff] min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-blue-900">
        Search Results for: <span className="text-[#FF9F1C]">{query}</span>
      </h2>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : results.length === 0 ? (
        <p className="text-gray-600">No activities found.</p>
      ) : (
        <ul className="space-y-4">
          {results.map((activity) => (
            <li
              key={activity.id}
              className="bg-white p-4 rounded shadow flex flex-col md:flex-row justify-between"
            >
              <div>
                <h3 className="font-semibold text-lg text-[#002147]">{activity.title}</h3>
                <p className="text-sm text-gray-600">Venue: {activity.venue}</p>
                <p className="text-sm text-gray-500">Department: {activity.department}</p>
                <p className="text-sm text-gray-500">Description: {activity.description}</p>
              </div>
              <div className="text-sm mt-2 md:mt-0 text-gray-700">
                {new Date(activity.start_time).toLocaleDateString()} -{" "}
                {new Date(activity.end_time).toLocaleDateString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchResults;
