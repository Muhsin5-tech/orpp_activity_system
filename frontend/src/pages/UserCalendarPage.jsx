import { Calendar, Views } from "react-big-calendar";
import localizer from "../utils/calendarConfig";
import "../styles/calendarCustom.css";
import { useState, useEffect } from "react";
import { getActivities } from "../activityApi";

function UserCalendarPage() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem("token");

  const deptColors = {
    "Registrar’s Office": "#002147",
    Compliance: "#e63946",
    ICT: "#2a9d8f",
    Finance: "#f4a261",
    Liaison: "#e9c46a",
    Legal: "#8ecae6",
  };

  const eventStyleGetter = event => ({
    style: {
      backgroundColor: deptColors[event.department] || "#264653",
      borderRadius: "6px",
      color: "white",
      fontSize: "0.85rem",
      padding: "5px 10px",
      border: "none",
    },
  });

  const fetchActivities = async () => {
    const data = await getActivities(token);
    setEvents(
      data.map(item => ({
        id: item.id,
        title: item.title,
        start: new Date(item.start_time),
        end: new Date(item.end_time),
        department: item.venue,
        description: item.description,
      }))
    );
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <div className="p-6 bg-[#f4f9ff] min-h-screen font-sans">
      <h1 className="text-4xl font-bold text-[#002147] mb-6 tracking-tight">
        ORPP Activity Calendar
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-md border border-blue-100">
        <Calendar
          localizer={localizer}
          events={events}
          views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
          defaultView={Views.MONTH}
          style={{ height: 600 }}
          eventPropGetter={eventStyleGetter}
          onSelectEvent={(event) => {
            setSelectedEvent(event);
            setIsModalOpen(true);
          }}
        />
      </div>

      {/* Enhanced Modal */}
      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 relative border border-gray-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl"
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-semibold text-[#002147] mb-2">
              {selectedEvent.title}
            </h2>
            <hr className="my-3 border-blue-100" />
            <div className="space-y-2 text-gray-700 text-sm">
              <p>
                <span className="font-medium text-gray-800">Department:</span>{" "}
                {selectedEvent.department}
              </p>
              <p>
                <span className="font-medium text-gray-800">Start:</span>{" "}
                {selectedEvent.start.toLocaleString()}
              </p>
              <p>
                <span className="font-medium text-gray-800">End:</span>{" "}
                {selectedEvent.end.toLocaleString()}
              </p>
              <p>
                <span className="font-medium text-gray-800">Description:</span>{" "}
                {selectedEvent.description || "No description provided."}
              </p>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-[#002147] hover:bg-blue-800 text-white px-5 py-2 rounded-lg transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserCalendarPage;
