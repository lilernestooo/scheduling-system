import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import AddEventModal from "./AddEventModal";

function CalendarView({ openModal }) {

  const [events, setEvents] = useState([
    {
      title: "Client Call",
      date: "2026-03-25",
      className: "orange"
    },
    {
      title: "Project Meeting",
      date: "2026-03-25",
      className: "red"
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  // Click date inside calendar
  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
    setIsModalOpen(true);

    if (openModal) {
      openModal(info.dateStr);
    }
  };

  // Save event
  const handleSaveEvent = (event) => {
    setEvents((prevEvents) => [...prevEvents, event]);
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">

      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-xl p-6">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Schedule Calendar
          </h2>
        </div>

        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          dateClick={handleDateClick}
          events={events}
          height="75vh"
        />

      </div>

      {/* Add Event Modal */}
      <AddEventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEvent}
        selectedDate={selectedDate}
      />

    </div>
  );
}

export default CalendarView;