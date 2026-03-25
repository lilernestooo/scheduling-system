import { useState } from "react";
import { useNavigate } from "react-router-dom";

const COLOR_SWATCHES = [
  { bg: "bg-yellow-200", hex: "#fef08a", label: "Yellow" },
  { bg: "bg-orange-200", hex: "#fed7aa", label: "Orange" },
  { bg: "bg-red-200",    hex: "#fecaca", label: "Red"    },
  { bg: "bg-green-200",  hex: "#bbf7d0", label: "Green"  },
  { bg: "bg-blue-200",   hex: "#bfdbfe", label: "Blue"   },
  { bg: "bg-purple-200", hex: "#e9d5ff", label: "Purple" },
  { bg: "bg-pink-200",   hex: "#fbcfe8", label: "Pink"   },
  { bg: "bg-cyan-200",   hex: "#a5f3fc", label: "Cyan"   },
];

function NoteColorPicker({ selected, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {COLOR_SWATCHES.map((swatch) => (
        <button
          key={swatch.bg}
          type="button"
          title={swatch.label}
          onClick={() => onChange(swatch)}
          className={`w-6 h-6 rounded-full border-2 transition-all duration-150 hover:scale-110 ${
            selected.bg === swatch.bg
              ? "border-gray-600 scale-110 ring-2 ring-offset-1 ring-gray-400 shadow-md"
              : "border-white shadow-sm hover:border-gray-300"
          }`}
          style={{ backgroundColor: swatch.hex }}
        />
      ))}
    </div>
  );
}

function Sidebar({ notes, onAddNote, darkMode, onToggleDark }) {
  const navigate = useNavigate();

  const [noteTitle, setNoteTitle]           = useState("");
  const [noteDescription, setNoteDescription] = useState("");
  const [noteTime, setNoteTime]             = useState("08:00");
  const [selectedSwatch, setSelectedSwatch] = useState(COLOR_SWATCHES[0]);
  const [draggingId, setDraggingId]         = useState(null);
  const [sidebarOpen, setSidebarOpen]       = useState(false);

  const handleAddNote = () => {
    if (!noteTitle.trim()) return;
    onAddNote({
      id:          Date.now(),
      text:        noteTitle.trim(),
      description: noteDescription.trim(),
      time:        noteTime,
      color:       selectedSwatch.bg,
      colorHex:    selectedSwatch.hex,
    });
    setNoteTitle("");
    setNoteDescription("");
    setNoteTime("08:00");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && noteTitle.trim()) {
      e.preventDefault();
      handleAddNote();
    }
  };

  const dm = darkMode;

  const panelClass = `flex flex-col h-full border-r transition-colors duration-300
    ${dm ? "bg-gray-900 text-gray-100 border-gray-800" : "bg-white text-gray-800 border-gray-200"}`;

  const inputClass = `w-full text-sm rounded-xl px-3 py-2.5 border outline-none transition-all
    ${dm
      ? "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
      : "bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"}`;

  const labelClass = `text-[10px] font-bold uppercase tracking-widest mb-1.5 block
    ${dm ? "text-gray-500" : "text-gray-400"}`;

  return (
    <>
      {/* Mobile hamburger */}
      <button
        className={`fixed top-4 left-4 z-50 md:hidden p-2.5 rounded-xl shadow-lg border transition-colors ${
          dm ? "bg-gray-800 text-white border-gray-700" : "bg-white text-gray-800 border-gray-100"
        }`}
        onClick={() => setSidebarOpen((o) => !o)}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          {sidebarOpen
            ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
        </svg>
      </button>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          w-80 min-w-[320px] z-40 flex-shrink-0
          fixed md:static inset-y-0 left-0
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          ${panelClass}
        `}
      >

        {/* ── Header ── */}
        <div className={`px-5 py-4 border-b flex-shrink-0 ${dm ? "border-gray-800" : "border-gray-100"}`}>

          {/* Row 1: back arrow + brand + dark toggle */}
          <div className="flex items-center justify-between">

            {/* Left: back + brand */}
            <div className="flex items-center gap-3">

              {/* Back to landing */}
              <button
                onClick={() => navigate("/landing")}
                title="Back to home"
                className={`p-1.5 rounded-lg transition-all hover:scale-105 active:scale-95 ${
                  dm
                    ? "text-gray-400 hover:text-gray-200 hover:bg-gray-800"
                    : "text-gray-400 hover:text-gray-700 hover:bg-gray-100"
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 5l-7 7 7 7" />
                </svg>
              </button>

              {/* Calendar icon + title */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-md shadow-indigo-500/20 flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="leading-none">
                  <h1 className="text-sm font-extrabold tracking-tight">Scheduler</h1>
                  <p className={`text-[10px] font-semibold mt-0.5 ${dm ? "text-indigo-400" : "text-indigo-500"}`}>
                    BY KARGADEV
                  </p>
                </div>
              </div>
            </div>

            {/* Dark mode toggle */}
            <button
              onClick={onToggleDark}
              title={dm ? "Light mode" : "Dark mode"}
              className={`p-2 rounded-xl border transition-all hover:scale-105 active:scale-95 ${
                dm
                  ? "bg-gray-800 text-yellow-400 border-gray-700"
                  : "bg-gray-100 text-gray-500 border-gray-200 hover:bg-gray-200"
              }`}
            >
              {dm ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 7a5 5 0 100 10A5 5 0 0012 7z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
                </svg>
              )}
            </button>
          </div>

          {/* Row 2: note count pill */}
          <div className={`mt-3 flex items-center gap-2 text-[11px] font-semibold ${dm ? "text-gray-500" : "text-gray-400"}`}>
            <span className={`px-2 py-0.5 rounded-full ${dm ? "bg-indigo-900/40 text-indigo-400" : "bg-indigo-50 text-indigo-500"}`}>
              {notes.length} note{notes.length !== 1 ? "s" : ""}
            </span>
            <span>saved · drag to calendar</span>
          </div>
        </div>

        {/* ── Scrollable body ── */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">

          {/* Create note form */}
          <section className="space-y-4">
            <h3 className={labelClass}>Create Sticky Note</h3>

            {/* Title */}
            <div>
              <label className={labelClass}>Title</label>
              <input
                type="text"
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Task name…"
                className={inputClass}
              />
            </div>

            {/* Time */}
            <div>
              <label className={labelClass}>Time</label>
              <input
                type="time"
                value={noteTime}
                onChange={(e) => setNoteTime(e.target.value)}
                className={inputClass}
              />
            </div>

            {/* Description */}
            <div>
              <label className={labelClass}>Details</label>
              <textarea
                value={noteDescription}
                onChange={(e) => setNoteDescription(e.target.value)}
                placeholder="Extra notes…"
                rows={3}
                className={`${inputClass} resize-none leading-relaxed`}
              />
            </div>

            {/* Color */}
            <div>
              <label className={labelClass}>Color</label>
              <NoteColorPicker selected={selectedSwatch} onChange={setSelectedSwatch} />
            </div>

            <button
              onClick={handleAddNote}
              disabled={!noteTitle.trim()}
              className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all duration-150 active:scale-95
                disabled:opacity-30 disabled:cursor-not-allowed
                ${dm
                  ? "bg-indigo-500 hover:bg-indigo-400 text-white shadow-lg shadow-indigo-500/20"
                  : "bg-gray-900 hover:bg-gray-700 text-white shadow-lg shadow-gray-900/10"}`}
            >
              Add Note to List
            </button>
          </section>

          <div className={`border-t ${dm ? "border-gray-800" : "border-gray-100"}`} />

          {/* Notes list */}
          <section>
            <h3 className={labelClass}>Saved Notes</h3>

            {notes.length === 0 ? (
              <div className={`text-center py-8 px-4 border-2 border-dashed rounded-2xl ${
                dm ? "border-gray-800 text-gray-600" : "border-gray-100 text-gray-400"
              }`}>
                <p className="text-xs italic">No notes yet. Create one above!</p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {notes.map((note) => (
                  <div
                    key={note.id}
                    draggable
                    data-note={JSON.stringify(note)}
                    onDragStart={(e) => {
                      setDraggingId(note.id);
                      e.dataTransfer.setData("application/json", JSON.stringify(note));
                      e.dataTransfer.effectAllowed = "move";
                    }}
                    onDragEnd={() => setDraggingId(null)}
                    className={`
                      ${note.color} p-3.5 rounded-2xl border border-black/5 shadow-sm
                      cursor-grab active:cursor-grabbing select-none
                      transition-all duration-150
                      ${draggingId === note.id
                        ? "opacity-30 scale-90 rotate-2"
                        : "hover:scale-[1.02] hover:shadow-md hover:-translate-y-0.5"}
                    `}
                    style={{ color: "#1f2937" }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-bold text-sm leading-tight">{note.text}</span>
                      <span className="text-[10px] font-bold bg-white/50 px-1.5 py-0.5 rounded-md flex-shrink-0">
                        {note.time}
                      </span>
                    </div>
                    {note.description && (
                      <p className="text-[11px] mt-1.5 opacity-60 line-clamp-2 leading-relaxed">
                        {note.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* ── Footer ── */}
        <div className={`px-5 py-3 border-t flex items-center justify-between flex-shrink-0 ${
          dm ? "border-gray-800" : "border-gray-100"
        }`}>
          <span className={`text-[10px] font-bold uppercase tracking-widest ${dm ? "text-gray-700" : "text-gray-300"}`}>
            © Scheduler 2026
          </span>
          <span className="text-[10px] font-bold text-indigo-500/50 uppercase tracking-widest">
            System Active
          </span>
        </div>

      </aside>
    </>
  );
}

export default Sidebar;