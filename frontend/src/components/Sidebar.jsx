function Sidebar({ onNewEvent }) {

  const handleNewEvent = () => {
    if (onNewEvent) {
      onNewEvent();
    }
  };

  return (
    <div className="w-64 min-h-screen bg-white shadow-lg flex flex-col">

      {/* Header */}
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold">
          Scheduler
        </h1>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">

        {/* New Event Button */}
        <button
          onClick={handleNewEvent}
          className="bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded-lg mb-8 transition"
        >
          + New Event
        </button>

        {/* Priority Legend */}
        <div>

          <h3 className="text-sm font-semibold text-gray-500 mb-4">
            PRIORITY
          </h3>

          <div className="space-y-3">

            <div className="flex items-center gap-3 text-sm">
              <span className="w-3 h-3 bg-red-500 rounded-full"></span>
              <span>Urgent</span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
              <span>Important</span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
              <span>Reminder</span>
            </div>

          </div>

        </div>

      </div>

      {/* Footer */}
      <div className="p-6 border-t text-xs text-gray-400">
        Scheduling System
      </div>

    </div>
  );
}

export default Sidebar;