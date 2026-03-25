import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

function CalendarView() {

  const events = [
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
  ];

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">

      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-xl p-6">

        <h2 className="text-xl font-semibold mb-4">
          Schedule Calendar
        </h2>

        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          events={events}
          height="75vh"
        />

      </div>

    </div>
  );
}

export default CalendarView;