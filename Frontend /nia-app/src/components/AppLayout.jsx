import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./navbar";

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("niaUser");

  const currentUser = storedUser
    ? JSON.parse(storedUser)
    : null;

  const handleLogout = () => {
    localStorage.removeItem("niaUser");
    navigate("/login");
  };

  return (
    <div className="app-layout">

      <Navbar
        user={currentUser}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        onLogout={handleLogout}
      />

      <main className="page-content">
        <Outlet />
      </main>

    </div>
  );
}