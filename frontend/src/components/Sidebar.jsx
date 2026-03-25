import { useState } from "react";

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
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDescription, setNoteDescription] = useState("");
  const [noteTime, setNoteTime] = useState("08:00");
  const [selectedSwatch, setSelectedSwatch] = useState(COLOR_SWATCHES[0]);
  const [draggingId, setDraggingId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleAddNote = () => {
    if (!noteTitle.trim()) return;
    
    onAddNote({
      id: Date.now(),
      text: noteTitle.trim(),
      description: noteDescription.trim(),
      time: noteTime,
      color: selectedSwatch.bg,
      colorHex: selectedSwatch.hex,
    });

    // Reset fields for the next note
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

  const panelClass = `flex flex-col h-full border-r transition-all duration-300 shadow-xl
    ${darkMode ? "bg-gray-900 text-gray-100 border-gray-700" : "bg-white text-gray-800 border-gray-200"}`;

  const inputClass = `w-full text-sm rounded-xl px-4 py-2.5 border outline-none transition-all
    ${darkMode 
      ? "bg-gray-800 border-gray-700 text-gray-100 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder-gray-500" 
      : "bg-gray-50 border-gray-200 text-gray-800 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 placeholder-gray-400"
    }`;

  const labelClass = `text-[10px] font-bold uppercase tracking-wider mb-1.5 block ${darkMode ? "text-gray-500" : "text-gray-400"}`;

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        className={`fixed top-4 left-4 z-50 md:hidden p-2.5 rounded-xl shadow-lg transition-colors ${
          darkMode ? "bg-gray-800 text-white border border-gray-700" : "bg-white text-gray-800 border border-gray-100"
        }`}
        onClick={() => setSidebarOpen((o) => !o)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          {sidebarOpen 
            ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          }
        </svg>
      </button>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden transition-opacity" onClick={() => setSidebarOpen(false)} />
      )}

      <aside
        className={`
          w-80 min-w-[320px] z-40 flex-shrink-0
          fixed md:static inset-y-0 left-0
          transform transition-transform duration-500 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          ${panelClass}
        `}
      >
        {/* Header Section */}
        <div className={`px-6 py-5 border-b flex items-center justify-between flex-shrink-0 ${darkMode ? "border-gray-800" : "border-gray-100"}`}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-indigo-500/20 shadow-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-base font-extrabold tracking-tight leading-none">Scheduler</h1>
              <p className={`text-[10px] font-medium mt-1 ${darkMode ? "text-indigo-400" : "text-indigo-600"}`}>BY KARGADEV</p>
            </div>
          </div>

          <button
            onClick={onToggleDark}
            className={`p-2 rounded-xl transition-all hover:scale-110 ${
              darkMode ? "bg-gray-800 text-yellow-400 border border-gray-700" : "bg-gray-100 text-gray-500 border border-gray-200"
            }`}
          >
            {darkMode ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 7a5 5 0 100 10A5 5 0 0012 7z" /></svg>
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" /></svg>
            )}
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8 custom-scrollbar">
          
          <section className="space-y-5">
            <h3 className={labelClass}>Create Sticky Note</h3>
            
            <div className="space-y-4">
              {/* Title Input */}
              <div>
                <label className={labelClass}>Note Title</label>
                <input
                  type="text"
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Task name..."
                  className={inputClass}
                />
              </div>

              {/* Time Picker */}
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
                <label className={labelClass}>Full Details</label>
                <textarea
                  value={noteDescription}
                  onChange={(e) => setNoteDescription(e.target.value)}
                  placeholder="Enter specific tasks or notes..."
                  rows={3}
                  className={`${inputClass} resize-none leading-relaxed`}
                />
              </div>

              {/* Color Swatch */}
              <div>
                <label className={labelClass}>Pick Color</label>
                <NoteColorPicker selected={selectedSwatch} onChange={setSelectedSwatch} />
              </div>

              <button
                onClick={handleAddNote}
                disabled={!noteTitle.trim()}
                className={`w-full py-3 rounded-xl text-sm font-bold transition-all duration-200 transform active:scale-95 shadow-lg
                  ${darkMode 
                    ? "bg-indigo-500 hover:bg-indigo-400 text-white shadow-indigo-500/20" 
                    : "bg-gray-900 hover:bg-gray-800 text-white shadow-gray-900/20"
                  } disabled:opacity-30 disabled:cursor-not-allowed`}
              >
                Add Note to List
              </button>
            </div>
          </section>

          <hr className={darkMode ? "border-gray-800" : "border-gray-100"} />

         {/* Draggable Notes List */}
<section>
  <h3 className={labelClass}>Saved Notes (Drag to Calendar)</h3>
  
  {notes.length === 0 ? (
    <div className={`text-center py-10 px-4 border-2 border-dashed rounded-2xl ${darkMode ? "border-gray-800 text-gray-600" : "border-gray-100 text-gray-400"}`}>
      <p className="text-xs italic">No notes yet. Create one to get started!</p>
    </div>
  ) : (
    <div className="space-y-3">
      {notes.map((note) => (
        <div
          key={note.id}
          draggable
          // CRITICAL: FullCalendar's Draggable API uses this to find the note data
          data-note={JSON.stringify(note)} 
          onDragStart={(e) => {
            setDraggingId(note.id);
            // standard dataTransfer for native drag-and-drop support
            e.dataTransfer.setData("application/json", JSON.stringify(note));
            e.dataTransfer.effectAllowed = "move";
          }}
          onDragEnd={() => setDraggingId(null)}
          className={`
            ${note.color} p-4 rounded-2xl shadow-sm border border-black/5
            cursor-grab active:cursor-grabbing transition-all duration-200
            ${draggingId === note.id 
              ? "opacity-30 scale-90 rotate-2" 
              : "hover:scale-[1.03] hover:shadow-xl hover:-translate-y-1"
            }
          `}
          style={{ color: "#1f2937" }}
        >
          <div className="flex justify-between items-start gap-2">
            <span className="font-bold text-sm leading-tight">{note.text}</span>
            <span className="text-[10px] font-black bg-white/40 px-1.5 py-0.5 rounded-md uppercase tracking-tighter">
              {note.time}
            </span>
          </div>
          {note.description && (
            <p className="text-[11px] mt-2 opacity-70 line-clamp-2 italic leading-relaxed">
              {note.description}
            </p>
          )}
        </div>
      ))}
    </div>
  )}
</section>
</div>
        {/* Footer info */}
        <div className={`px-6 py-4 border-t flex items-center justify-between text-[10px] font-bold uppercase tracking-widest ${
          darkMode ? "border-gray-800 text-gray-600" : "border-gray-100 text-gray-400"
        }`}>
          <span>@Scheduler 2026 </span>
          <span className="text-indigo-500/50 underline">System Active</span>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;