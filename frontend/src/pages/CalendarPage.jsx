import { Calendar, Views } from "react-big-calendar";
import localizer from "../utils/calendarConfig";
import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import {
  getActivities,
  createActivity,
  updateActivity,
  deleteActivity
} from "../activityApi";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "../styles/calendarCustom.css";

function CalendarPage() {
  const [events, setEvents] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [formEvent, setFormEvent] = useState({
    id: null,
    title: "",
    start: "",
    end: "",
    category: "",
    venue: "",
    department: "",
    description: "",
    member_notes: "",
    attachment: null,
  });

  const token = localStorage.getItem("token");

  const fetchActivities = async () => {
    const data = await getActivities(token);
    const formatted = data.map(item => ({
      id: item.id,
      title: item.title,
      start: new Date(item.start_time),
      end: new Date(item.end_time),
      description: item.description,
      category: item.category,
      venue: item.venue,
      department: item.department,
      member_notes: item.member_notes,
      attachment: item.attachment,
    }));
    setEvents(formatted);
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const openForm = (event = null) => {
    if (event) {
      setFormEvent({
        id: event.id,
        title: event.title,
        start: moment(event.start).format("YYYY-MM-DDTHH:mm"),
        end: moment(event.end).format("YYYY-MM-DDTHH:mm"),
        category: event.category,
        department: event.department,
        venue: event.venue,
        description: event.description,
        member_notes: event.member_notes || "",
        attachment: null,
      });
    } else {
      setFormEvent({
        id: null,
        title: "",
        start: "",
        end: "",
        category: "",
        venue: "",
        department: "",
        description: "",
        member_notes: "",
        attachment: null,
      });
    }
    setIsOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formEvent.id) {
      await updateActivity(
        formEvent.id,
        {
          title: formEvent.title,
          description: formEvent.description,
          member_notes: formEvent.member_notes,
          category: formEvent.category,
          start_time: formEvent.start,
          end_time: formEvent.end,
          venue: formEvent.venue,
          department: formEvent.department,
        },
        token
      );
    } else {
      const formData = new FormData();
      formData.append("title", formEvent.title);
      formData.append("description", formEvent.description);
      formData.append("member_notes", formEvent.member_notes);
      formData.append("category", formEvent.category);
      formData.append("start_time", formEvent.start);
      formData.append("end_time", formEvent.end);
      formData.append("venue", formEvent.venue);
      formData.append("department", formEvent.department);
      if (formEvent.attachment) {
        formData.append("attachment", formEvent.attachment);
      }
      await createActivity(formData, token);
    }

    await fetchActivities();
    setIsOpen(false);
  };

  const handleDelete = async () => {
    if (formEvent.id) {
      await deleteActivity(formEvent.id, token);
      await fetchActivities();
      setIsOpen(false);
    }
  };

  const categories = ["Meeting", "Forum", "Workshop", "Compliance Deadline"];
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

  const eventStyleGetter = event => ({
    style: {
      backgroundColor: "#0077b6",
      borderRadius: "5px",
      color: "white",
      padding: "2px 6px",
    },
  });

  return (
    <div className="p-6 bg-[#f4f9ff] min-h-screen">
      <div className="flex justify-between mb-4">
        <h1 className="text-3xl font-bold text-[#002147]">Activity Calendar</h1>
        <button
          onClick={() => openForm()}
          className="bg-[#002147] text-white px-4 py-2 rounded"
        >
          + Add Activity
        </button>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <Calendar
          localizer={localizer}
          events={events}
          views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
          defaultView={Views.MONTH}
          style={{ height: 600 }}
          eventPropGetter={eventStyleGetter}
          onSelectEvent={openForm}
        />
      </div>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg p-6 w-full max-w-xl shadow-lg">
            <Dialog.Title className="text-2xl font-bold mb-4 text-[#002147]">
              {formEvent.id ? "Edit Activity" : "Add New Activity"}
            </Dialog.Title>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" required value={formEvent.title}
                onChange={(e) => setFormEvent({ ...formEvent, title: e.target.value })}
                placeholder="Title" className="w-full border px-3 py-2 rounded" />
              <textarea value={formEvent.description}
                onChange={(e) => setFormEvent({ ...formEvent, description: e.target.value })}
                placeholder="Description" rows="3" className="w-full border px-3 py-2 rounded" />
              <textarea value={formEvent.member_notes}
                onChange={(e) => setFormEvent({ ...formEvent, member_notes: e.target.value })}
                placeholder="Notes for Members Attending" rows="2" className="w-full border px-3 py-2 rounded" />
              <div className="flex gap-4">
                <input type="datetime-local" required value={formEvent.start}
                  onChange={(e) => setFormEvent({ ...formEvent, start: e.target.value })}
                  className="w-1/2 border px-3 py-2 rounded" />
                <input type="datetime-local" required value={formEvent.end}
                  onChange={(e) => setFormEvent({ ...formEvent, end: e.target.value })}
                  className="w-1/2 border px-3 py-2 rounded" />
              </div>
              <input type="text" placeholder="Venue" value={formEvent.venue}
                onChange={(e) => setFormEvent({ ...formEvent, venue: e.target.value })}
                className="w-full border px-3 py-2 rounded" />
              <select value={formEvent.department}
                onChange={(e) => setFormEvent({ ...formEvent, department: e.target.value })}
                className="w-full border px-3 py-2 rounded">
                <option value="">-- Select Department --</option>
                {departments.map((d, i) => <option key={i} value={d}>{d}</option>)}
              </select>
              <select value={formEvent.category}
                onChange={(e) => setFormEvent({ ...formEvent, category: e.target.value })}
                className="w-full border px-3 py-2 rounded">
                <option value="">-- Select Category --</option>
                {categories.map((c, i) => <option key={i} value={c}>{c}</option>)}
              </select>
              <input type="file"
                onChange={(e) => setFormEvent({ ...formEvent, attachment: e.target.files[0] })}
                className="w-full" />
              <div className="flex justify-end gap-3 pt-4">
                {formEvent.id && (
                  <button type="button" onClick={handleDelete}
                    className="bg-red-500 text-white px-4 py-2 rounded">
                    Delete
                  </button>
                )}
                <button type="submit"
                  className="bg-[#002147] text-white px-4 py-2 rounded">
                  Save
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}

export default CalendarPage;
