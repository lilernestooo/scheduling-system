import { useState } from "react";

export default function AddEventModal({ isOpen, onClose, onSave, selectedDate }) {
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [priority, setPriority] = useState("normal");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEvent = {
      id: Date.now(),
      title,
      start: `${selectedDate}T${startTime}`,
      end: `${selectedDate}T${endTime}`,
      priority,
      backgroundColor:
        priority === "urgent"
          ? "#ef4444"
          : priority === "important"
          ? "#f97316"
          : "#eab308",
    };

    onSave(newEvent);

    setTitle("");
    setStartTime("");
    setEndTime("");
    setPriority("normal");

    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      
      <div className="bg-white rounded-xl shadow-lg w-[400px] p-6">
        
        <h2 className="text-xl font-semibold mb-4">Create Event</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Title */}
          <div>
            <label className="block text-sm mb-1">Event Title</label>
            <input
              type="text"
              className="w-full border rounded-md p-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Start Time */}
          <div>
            <label className="block text-sm mb-1">Start Time</label>
            <input
              type="time"
              className="w-full border rounded-md p-2"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>

          {/* End Time */}
          <div>
            <label className="block text-sm mb-1">End Time</label>
            <input
              type="time"
              className="w-full border rounded-md p-2"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm mb-1">Priority</label>
            <select
              className="w-full border rounded-md p-2"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="urgent">Urgent</option>
              <option value="important">Important</option>
              <option value="normal">Reminder</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
            >
              Save Event
            </button>
          </div>

        </form>
      </div>

    </div>
  );
}