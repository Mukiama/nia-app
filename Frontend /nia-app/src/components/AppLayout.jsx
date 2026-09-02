import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import { getUser, clearAuth } from "../api/client";

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const currentUser = getUser();

  const handleLogout = () => {
    clearAuth();
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