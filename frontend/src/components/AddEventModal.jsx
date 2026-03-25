import { useState, useEffect } from "react";

const PRIORITY_OPTIONS = [
  {
    value: "urgent",
    label: "Urgent",
    desc: "Must do today",
    dot: "bg-red-500",
    ring: "ring-red-400",
    activeBg: "bg-red-50 border-red-400 text-red-700",
    darkActiveBg: "bg-red-950/40 border-red-500 text-red-300",
  },
  {
    value: "important",
    label: "Important",
    desc: "High priority",
    dot: "bg-orange-400",
    ring: "ring-orange-400",
    activeBg: "bg-orange-50 border-orange-400 text-orange-700",
    darkActiveBg: "bg-orange-950/40 border-orange-500 text-orange-300",
  },
  {
    value: "normal",
    label: "Reminder",
    desc: "Low priority",
    dot: "bg-yellow-400",
    ring: "ring-yellow-400",
    activeBg: "bg-yellow-50 border-yellow-400 text-yellow-700",
    darkActiveBg: "bg-yellow-950/40 border-yellow-500 text-yellow-300",
  },
];

export default function AddEventModal({ isOpen, onClose, onSave, selectedDate, darkMode }) {
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [priority, setPriority] = useState("normal");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTitle("");
      setStartTime("");
      setEndTime("");
      setPriority("normal");
      // Slight delay for mount animation
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newNote = {
      id: Date.now(),
      text: title,
      title,
      date: selectedDate || null,
      start: selectedDate
        ? startTime
          ? `${selectedDate}T${startTime}`
          : selectedDate
        : null,
      end: selectedDate && endTime ? `${selectedDate}T${endTime}` : null,
      startTime,
      endTime,
      priority,
      color:
        priority === "urgent"
          ? "bg-red-200"
          : priority === "important"
          ? "bg-orange-200"
          : "bg-yellow-200",
    };

    onSave(newNote);
    onClose();
  };

  const inputClass = `w-full rounded-xl px-3 py-2.5 text-sm border outline-none transition-all focus:ring-2 ${
    darkMode
      ? "bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500"
      : "bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400 focus:ring-indigo-400 focus:border-indigo-400"
  }`;

  const labelClass = `block text-xs font-semibold uppercase tracking-wide mb-1.5 ${
    darkMode ? "text-gray-400" : "text-gray-500"
  }`;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end sm:items-center justify-center transition-all duration-200 ${
        visible ? "bg-black/50 backdrop-blur-sm" : "bg-black/0"
      }`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className={`
          w-full sm:w-[440px] rounded-t-3xl sm:rounded-2xl shadow-2xl p-6 transition-all duration-300
          ${visible ? "translate-y-0 opacity-100 scale-100" : "translate-y-8 opacity-0 scale-95"}
          ${darkMode ? "bg-gray-900 border border-gray-700" : "bg-white"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className={`text-xl font-bold ${darkMode ? "text-gray-100" : "text-gray-800"}`}>
              New Event
            </h2>
            {selectedDate && (
              <p className={`text-xs mt-0.5 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                {new Date(selectedDate + "T12:00:00").toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-xl transition-colors ${
              darkMode ? "hover:bg-gray-700 text-gray-400" : "hover:bg-gray-100 text-gray-400"
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className={labelClass}>Event Title</label>
            <input
              type="text"
              className={inputClass}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What's happening?"
              autoFocus
              required
            />
          </div>

          {/* Time row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Start Time</label>
              <input
                type="time"
                className={inputClass}
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>End Time</label>
              <input
                type="time"
                className={inputClass}
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>

          {/* Priority selector - visual cards */}
          <div>
            <label className={labelClass}>Priority</label>
            <div className="grid grid-cols-3 gap-2">
              {PRIORITY_OPTIONS.map((opt) => {
                const isActive = priority === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setPriority(opt.value)}
                    className={`
                      p-3 rounded-xl border-2 text-left transition-all duration-150
                      ${isActive
                        ? darkMode ? opt.darkActiveBg : opt.activeBg
                        : darkMode
                          ? "border-gray-700 hover:border-gray-500 text-gray-400"
                          : "border-gray-100 hover:border-gray-300 text-gray-500"
                      }
                      ${isActive ? "ring-2 ring-offset-1 " + opt.ring : ""}
                    `}
                  >
                    <span className={`w-2.5 h-2.5 rounded-full block mb-2 ${opt.dot}`} />
                    <span className="text-xs font-bold block">{opt.label}</span>
                    <span className="text-[10px] opacity-70 block">{opt.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                darkMode
                  ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-600"
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 shadow-md hover:shadow-lg active:scale-95 transition-all"
            >
              Save Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}