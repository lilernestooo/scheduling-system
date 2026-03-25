function AgendaPanel() {
  return (
    <div className="w-72 bg-white shadow-lg p-5">

      <h2 className="text-xl font-bold mb-4">
        Today's Agenda
      </h2>

      <div className="space-y-3">

        <div className="border-l-4 border-red-500 pl-3">
          <p className="font-semibold">Project Meeting</p>
          <p className="text-sm text-gray-500">10:00 AM</p>
        </div>

        <div className="border-l-4 border-yellow-400 pl-3">
          <p className="font-semibold">Design Review</p>
          <p className="text-sm text-gray-500">1:00 PM</p>
        </div>

      </div>

    </div>
  );
}

export default AgendaPanel;