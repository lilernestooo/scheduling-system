function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-lg p-5">

      <h1 className="text-2xl font-bold mb-6">
        Scheduler
      </h1>

      <button className="bg-blue-500 text-white w-full py-2 rounded mb-4">
        + New Event
      </button>

      <div className="space-y-3">

        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-red-500 rounded"></span>
          Urgent
        </div>

        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-yellow-400 rounded"></span>
          Important
        </div>

        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-orange-500 rounded"></span>
          Reminder
        </div>

      </div>

    </div>
  );
}

export default Sidebar;