import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";

function App() {
  return (
    <BrowserRouter>

      <div className="h-screen w-screen bg-gray-100">

        <Routes>

          {/* Login first */}
          <Route path="/" element={<Login />} />

          {/* Authentication */}
          <Route path="/register" element={<Register />} />

          {/* Landing after login */}
          <Route path="/landing" element={<Landing />} />

          {/* Main system */}
          <Route path="/dashboard" element={<Dashboard />} />

        </Routes>

      </div>

    </BrowserRouter>
  );
}

export default App;