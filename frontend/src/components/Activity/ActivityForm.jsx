import { useState } from "react";
import { createActivity } from "../activityApi";

function ActivityForm({ token, onCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [venue, setVenue] = useState("");
  const [department, setDepartment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", "Meeting");
    formData.append("start_time", new Date().toISOString());
    formData.append("end_time", new Date(new Date().getTime() + 60 * 60 * 1000).toISOString());
    formData.append("venue", venue);
    formData.append("department", department);

    try {
      await createActivity(formData, token);
      onCreated();
      setTitle("");
      setDescription("");
      setVenue("");
      setDepartment("");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4 text-blue-900">Add New Activity</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          rows="3"
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
          placeholder="Venue"
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          placeholder="Department"
          className="w-full border px-3 py-2 rounded"
        />
        <button type="submit" className="bg-[#002147] text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}

export default ActivityForm;
