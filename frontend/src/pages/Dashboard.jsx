import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import CalendarView from "../components/CalendarView";
import AgendaPanel from "../components/AgendaPanel";

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const [calendarEvents, setCalendarEvents] = useState(() => {
    const saved = localStorage.getItem("calendarEvents");
    return saved ? JSON.parse(saved) : [];
  });

  // Keep AgendaPanel in sync when calendar saves
  useEffect(() => {
    const sync = () => {
      const saved = localStorage.getItem("calendarEvents");
      setCalendarEvents(saved ? JSON.parse(saved) : []);
    };
    window.addEventListener("calendarUpdated", sync);
    return () => window.removeEventListener("calendarUpdated", sync);
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Called by Sidebar "Add Note" button
  const handleAddNote = (note) => {
    setNotes((prev) => [...prev, note]);
  };

  // Called by CalendarView after a note is dropped onto a date
  const handleRemoveNote = (noteId) => {
    setNotes((prev) => prev.filter((n) => n.id !== noteId));
  };

  return (
    <div
      className={`flex h-screen overflow-hidden transition-colors duration-300 ${
        darkMode ? "dark bg-gray-950" : "bg-slate-100"
      }`}
    >
      <Sidebar
        notes={notes}
        onAddNote={handleAddNote}
        darkMode={darkMode}
        onToggleDark={() => setDarkMode((d) => !d)}
      />

      <div className="flex-1 overflow-auto">
        <CalendarView
          notes={notes}
          removeNote={handleRemoveNote}
          darkMode={darkMode}
        />
      </div>

      <AgendaPanel events={calendarEvents} darkMode={darkMode} />
    </div>
  );
}

export default Dashboard;