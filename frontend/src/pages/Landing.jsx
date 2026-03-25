import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6 bg-white shadow">

        <h1 className="text-2xl font-bold text-blue-600">
          Scheduler
        </h1>

        <div className="space-x-4">
          <Link
            to="/login"
            className="text-gray-700 hover:text-blue-500"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Register
          </Link>
        </div>

      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-6">

        <h2 className="text-5xl font-bold mb-6">
          Organize Your Schedule
        </h2>

        <p className="text-gray-600 max-w-xl mb-8">
          A modern scheduling system that helps you manage events,
          meetings, and reminders efficiently with an intuitive calendar.
        </p>

        <div className="flex gap-4">

          <Link
            to="/Dashboard"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
          >
            Get Started
          </Link>
         </div>

      </section>

      {/* Features */}
      <section className="bg-white py-16 px-10">

        <h3 className="text-3xl font-bold text-center mb-12">
          Features
        </h3>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h4 className="font-semibold text-xl mb-3">
              Smart Calendar
            </h4>
            <p className="text-gray-600">
              Plan your tasks easily with an interactive calendar.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h4 className="font-semibold text-xl mb-3">
              Event Reminders
            </h4>
            <p className="text-gray-600">
              Never miss important meetings and deadlines again.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h4 className="font-semibold text-xl mb-3">
              Priority Management
            </h4>
            <p className="text-gray-600">
              Organize urgent, important, and reminder events visually.
            </p>
          </div>

        </div>

      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500">
        © 2026 Scheduler System
      </footer>

    </div>
  );
}

export default Landing;