import Sidebar from "../components/Sidebar";
import CalendarView from "../components/CalendarView";
import AgendaPanel from "../components/AgendaPanel";

function Dashboard() {
  return (
    <div className="flex h-screen">

      <Sidebar />

      <div className="flex-1 p-6">
        <CalendarView />
      </div>

      <AgendaPanel />

    </div>
  );
}

export default Dashboard;