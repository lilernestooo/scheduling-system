import { useState } from "react";

const PRIORITY_STYLE = {
  urgent:    { border: "border-red-500",    bg: "bg-red-500",    dot: "🔴", label: "Urgent"    },
  important: { border: "border-orange-400", bg: "bg-orange-400", dot: "🟠", label: "Important" },
  normal:    { border: "border-yellow-400", bg: "bg-yellow-400", dot: "🟡", label: "Reminder"  },
};

function formatTime(isoOrTime) {
  if (!isoOrTime) return null;
  // Handle "HH:MM" string
  if (/^\d{2}:\d{2}$/.test(isoOrTime)) {
    const [h, m] = isoOrTime.split(":").map(Number);
    const ampm = h >= 12 ? "PM" : "AM";
    const hour = h % 12 || 12;
    return `${hour}:${String(m).padStart(2, "0")} ${ampm}`;
  }
  // Handle ISO datetime
  try {
    return new Date(isoOrTime).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return null;
  }
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  try {
    return new Date(dateStr + (dateStr.length === 10 ? "T12:00:00" : "")).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function AgendaPanel({ events = [], darkMode }) {
  const [collapsed, setCollapsed] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  // Sort events: today first, then upcoming, then past
  const sorted = [...events].sort((a, b) => {
    const da = (a.start || a.date || "").slice(0, 10);
    const db = (b.start || b.date || "").slice(0, 10);
    return da.localeCompare(db);
  });

  const todayEvents = sorted.filter((e) => {
    const d = (e.start || e.date || "").slice(0, 10);
    return d === today;
  });

  const upcomingEvents = sorted.filter((e) => {
    const d = (e.start || e.date || "").slice(0, 10);
    return d > today;
  });

  const pastEvents = sorted.filter((e) => {
    const d = (e.start || e.date || "").slice(0, 10);
    return d < today;
  });

  const base = `
    w-72 min-w-[288px] flex-shrink-0 flex flex-col h-full overflow-hidden
    transition-all duration-300
    ${darkMode ? "bg-gray-900 border-l border-gray-700 text-gray-100" : "bg-white border-l border-gray-200 text-gray-800"}
  `;

  const EventCard = ({ event }) => {
    const p = event.priority || "normal";
    const style = PRIORITY_STYLE[p] || PRIORITY_STYLE.normal;
    const startTime = formatTime(event.startTime || (event.start?.includes("T") ? event.start : null));
    const endTime = formatTime(event.endTime || (event.end?.includes("T") ? event.end : null));
    const dateStr = (event.start || event.date || "").slice(0, 10);

    return (
      <div
        className={`
          border-l-4 pl-3 py-2 pr-2 rounded-r-xl transition-all
          ${style.border}
          ${darkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"}
        `}
      >
        <div className="flex items-start justify-between gap-1">
          <p className={`text-sm font-semibold leading-tight ${darkMode ? "text-gray-100" : "text-gray-800"}`}>
            {event.title || event.text}
          </p>
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0 ${
            darkMode ? "bg-gray-700 text-gray-400" : "bg-gray-100 text-gray-500"
          }`}>
            {style.label}
          </span>
        </div>

        <div className={`text-xs mt-1 flex flex-wrap gap-x-2 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
          {dateStr && dateStr !== today && (
            <span>{formatDate(dateStr)}</span>
          )}
          {startTime && (
            <span>{startTime}{endTime ? ` – ${endTime}` : ""}</span>
          )}
          {!startTime && !dateStr && (
            <span className="italic">All day</span>
          )}
        </div>
      </div>
    );
  };

  const SectionHeading = ({ label, count }) => (
    <div className="flex items-center gap-2 mb-2">
      <span className={`text-[11px] font-bold uppercase tracking-widest ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
        {label}
      </span>
      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
        darkMode ? "bg-gray-700 text-gray-400" : "bg-gray-100 text-gray-500"
      }`}>
        {count}
      </span>
    </div>
  );

  return (
    <aside className={base}>
      {/* Header */}
      <div className={`p-5 border-b flex items-center justify-between flex-shrink-0 ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h2 className="text-base font-bold">Agenda</h2>
        </div>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className={`p-1.5 rounded-lg transition-colors ${
            darkMode ? "hover:bg-gray-700 text-gray-400" : "hover:bg-gray-100 text-gray-400"
          }`}
        >
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${collapsed ? "rotate-180" : ""}`}
            fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Body */}
      {!collapsed && (
        <div className="flex-1 overflow-y-auto p-4 space-y-6">

          {/* Today */}
          <div>
            <SectionHeading label="Today" count={todayEvents.length} />
            {todayEvents.length === 0 ? (
              <p className={`text-xs italic ${darkMode ? "text-gray-600" : "text-gray-400"}`}>
                Nothing scheduled today 🎉
              </p>
            ) : (
              <div className="space-y-2">
                {todayEvents.map((e) => <EventCard key={e.id} event={e} />)}
              </div>
            )}
          </div>

          {/* Upcoming */}
          {upcomingEvents.length > 0 && (
            <div>
              <SectionHeading label="Upcoming" count={upcomingEvents.length} />
              <div className="space-y-2">
                {upcomingEvents.slice(0, 8).map((e) => <EventCard key={e.id} event={e} />)}
                {upcomingEvents.length > 8 && (
                  <p className={`text-xs text-center pt-1 ${darkMode ? "text-gray-600" : "text-gray-400"}`}>
                    +{upcomingEvents.length - 8} more
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Past */}
          {pastEvents.length > 0 && (
            <div>
              <SectionHeading label="Past" count={pastEvents.length} />
              <div className="space-y-2 opacity-50">
                {pastEvents.slice(-3).map((e) => <EventCard key={e.id} event={e} />)}
              </div>
            </div>
          )}

          {/* Empty state */}
          {events.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className={`w-12 h-12 rounded-2xl mb-3 flex items-center justify-center ${
                darkMode ? "bg-gray-800" : "bg-gray-100"
              }`}>
                <svg className={`w-6 h-6 ${darkMode ? "text-gray-600" : "text-gray-300"}`} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className={`text-sm font-medium ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                No events yet
              </p>
              <p className={`text-xs mt-1 ${darkMode ? "text-gray-600" : "text-gray-300"}`}>
                Add one from the calendar
              </p>
            </div>
          )}
        </div>
      )}
    </aside>
  );
}

export default AgendaPanel;