import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";

// Map tailwind bg class → calendar hex colors
const COLOR_MAP = {
  "bg-yellow-200": { bg: "#fef08a", border: "#ca8a04", text: "#713f12" },
  "bg-orange-200": { bg: "#fed7aa", border: "#ea580c", text: "#7c2d12" },
  "bg-red-200":    { bg: "#fecaca", border: "#dc2626", text: "#7f1d1d" },
  "bg-green-200":  { bg: "#bbf7d0", border: "#16a34a", text: "#14532d" },
  "bg-blue-200":   { bg: "#bfdbfe", border: "#2563eb", text: "#1e3a8a" },
  "bg-purple-200": { bg: "#e9d5ff", border: "#9333ea", text: "#581c87" },
  "bg-pink-200":   { bg: "#fbcfe8", border: "#db2777", text: "#831843" },
  "bg-cyan-200":   { bg: "#a5f3fc", border: "#0891b2", text: "#164e63" },
};

function CalendarView({ notes, removeNote, darkMode }) {
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem("calendarEvents");
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sync Draggable Sidebar items
  useEffect(() => {
    const el = document.querySelector("aside");
    if (!el) return;

    // FIX: Using the Draggable API with better positioning options
    const draggable = new Draggable(el, {
      itemSelector: "[data-note]", 
      // This ensures the "ghost" follows the mouse correctly by appending to body
      appendTo: document.body,
      eventData: (dragEl) => {
        const noteData = JSON.parse(dragEl.getAttribute("data-note") || "{}");
        const colorDef = COLOR_MAP[noteData.color] || COLOR_MAP["bg-yellow-200"];
        
        return {
          title: noteData.text,
          backgroundColor: colorDef.bg,
          borderColor: colorDef.border,
          textColor: colorDef.text,
          extendedProps: { 
            description: noteData.description, 
            time: noteData.time,
            noteId: noteData.id 
          },
        };
      },
    });

    return () => draggable.destroy();
  }, [notes]);

  const persistEvents = (updated) => {
    localStorage.setItem("calendarEvents", JSON.stringify(updated));
    // Notifies other components (like Agenda) that data changed
    window.dispatchEvent(new Event("calendarUpdated"));
    return updated;
  };

  const handleEventReceive = (info) => {
    const noteId = info.event.extendedProps?.noteId;

    const newEvent = {
      id: `note-${Date.now()}`,
      title: info.event.title,
      start: info.event.startStr,
      allDay: true,
      backgroundColor: info.event.backgroundColor,
      borderColor: info.event.borderColor,
      textColor: info.event.textColor,
      extendedProps: { 
        description: info.event.extendedProps.description,
        time: info.event.extendedProps.time,
        noteId 
      },
    };

    setEvents((prev) => persistEvents([...prev, newEvent]));
    if (noteId && removeNote) removeNote(noteId);
    info.event.remove(); // Remove the temporary drop event
  };

  const handleEventClick = (info) => {
    setSelectedEvent({
      title: info.event.title,
      start: info.event.start,
      description: info.event.extendedProps.description,
      time: info.event.extendedProps.time,
      color: info.event.backgroundColor,
      id: info.event.id
    });
    setIsModalOpen(true);
  };

  const deleteEvent = (id) => {
    setEvents((prev) => persistEvents(prev.filter(e => e.id !== id)));
    setIsModalOpen(false);
  };

  const clearAll = () => {
    if (!window.confirm("Clear all calendar events?")) return;
    localStorage.removeItem("calendarEvents");
    setEvents([]);
    window.dispatchEvent(new Event("calendarUpdated"));
  };

  const darkCSS = darkMode ? `
    .fc { color: #e5e7eb !important; }
    .fc .fc-toolbar-title { font-weight: 800; color: #fff !important; }
    .fc .fc-button { background: #1f2937 !important; border: 1px solid #374151 !important; color: #9ca3af !important; border-radius: 12px !important; }
    .fc .fc-button-primary:not(:disabled).fc-button-active { background: #6366f1 !important; color: white !important; }
    .fc .fc-daygrid-day { background: #0f172a !important; }
    .fc .fc-daygrid-day:hover { background: #1e293b !important; }
    .fc .fc-col-header-cell { background: #1e293b !important; padding: 12px 0; }
    .fc-theme-standard td, .fc-theme-standard th, .fc-theme-standard .fc-scrollgrid { border-color: #1e293b !important; }
    .fc .fc-day-today { background: #1e1b4b !important; }
    .fc .fc-daygrid-event { border-radius: 8px !important; padding: 4px 6px; font-weight: 600; }
  ` : `
    .fc .fc-toolbar-title { font-weight: 800; color: #1e293b; }
    .fc .fc-button { background: #fff !important; border: 1px solid #e2e8f0 !important; color: #64748b !important; border-radius: 12px !important; }
    .fc .fc-button-primary:not(:disabled).fc-button-active { background: #6366f1 !important; color: white !important; }
    .fc .fc-daygrid-event { border-radius: 8px !important; padding: 3px 5px; font-weight: 600; font-size: 0.75rem !important; }
  `;

  return (
    <div className={`w-full min-h-screen p-4 md:p-8 transition-all duration-500 ${darkMode ? "bg-gray-950" : "bg-slate-50"}`}>
      <style>{darkCSS}</style>

      <div className={`max-w-7xl mx-auto rounded-[2.5rem] shadow-2xl p-6 md:p-8 transition-all ${darkMode ? "bg-gray-900/50 backdrop-blur-md border border-gray-800" : "bg-white border border-slate-100"}`}>
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h2 className={`text-3xl font-black tracking-tight ${darkMode ? "text-white" : "text-slate-800"}`}>
              Schedule Calendar
            </h2>
            <p className={`text-sm font-medium mt-1 ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
              Drag and drop your OJT tasks to organize your week.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {events.length > 0 && (
              <button onClick={clearAll} className="px-5 py-2.5 text-xs font-bold text-red-500 bg-red-500/10 hover:bg-red-500 hover:text-white rounded-2xl transition-all active:scale-95">
                Clear All
              </button>
            )}
            <div className={`px-5 py-2.5 rounded-2xl text-xs font-bold border ${darkMode ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" : "bg-indigo-50 text-indigo-600 border-indigo-100"}`}>
              {events.length} active event{events.length !== 1 ? "s" : ""}
            </div>
          </div>
        </div>

        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          editable={true}
          droppable={true}
          eventReceive={handleEventReceive}
          eventClick={handleEventClick}
          events={events}
          height="auto"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          eventDisplay="block"
        />
      </div>

      {/* DETAIL MODAL */}
      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className={`w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden transform transition-all ${darkMode ? "bg-gray-800 border border-gray-700" : "bg-white"}`}>
            
            <div className="h-2 w-full" style={{ backgroundColor: selectedEvent.color }} />
            
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg mb-3 inline-block ${darkMode ? "bg-gray-700 text-indigo-400" : "bg-indigo-50 text-indigo-600"}`}>
                    Task Details
                  </span>
                  <h3 className={`text-2xl font-black leading-tight ${darkMode ? "text-white" : "text-slate-800"}`}>
                    {selectedEvent.title}
                  </h3>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-gray-700 transition-colors">
                  <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3.5 rounded-2xl ${darkMode ? "bg-gray-900" : "bg-slate-100"}`}>
                    <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${darkMode ? "text-slate-500" : "text-slate-400"}`}>Time</p>
                    <p className={`text-sm font-bold ${darkMode ? "text-slate-200" : "text-slate-700"}`}>{selectedEvent.time || "Not specified"}</p>
                  </div>
                </div>

                <div>
                  <p className={`text-[10px] font-bold uppercase tracking-widest mb-3 ${darkMode ? "text-slate-500" : "text-slate-400"}`}>Description</p>
                  <div className={`p-5 rounded-3xl text-sm leading-relaxed ${darkMode ? "bg-gray-900/50 text-slate-300" : "bg-slate-50 text-slate-600 italic"}`}>
                    {selectedEvent.description || "No description provided."}
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-gray-700/10 flex gap-4">
                <button 
                  onClick={() => deleteEvent(selectedEvent.id)}
                  className="flex-1 py-4 rounded-2xl text-xs font-bold bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all active:scale-95"
                >
                  Delete Task
                </button>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className={`flex-1 py-4 rounded-2xl text-xs font-bold transition-all active:scale-95 ${darkMode ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-slate-900 text-white hover:bg-slate-800"}`}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CalendarView;