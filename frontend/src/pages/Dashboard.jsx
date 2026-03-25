import { useState } from "react";
import Sidebar from "../components/Sidebar";
import CalendarView from "../components/CalendarView";
import AgendaPanel from "../components/AgendaPanel";
import AddEventModal from "../components/AddEventModal";

function Dashboard() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className="flex h-screen">

      <Sidebar onNewEvent={() => setIsModalOpen(true)} />

      <div className="flex-1 p-6">
        <CalendarView
          openModal={(date) => {
            setSelectedDate(date);
            setIsModalOpen(true);
          }}
        />
      </div>

      <AgendaPanel />

      <AddEventModal
        isOpen={isModalOpen}
        selectedDate={selectedDate}
        onClose={() => setIsModalOpen(false)}
      />

    </div>
  );
}

export default Dashboard;