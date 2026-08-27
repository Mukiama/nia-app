import { Link } from "react-router-dom";
import "../styles/navbar.css";

export default function Navbar({
  user,
  sidebarOpen,
  setSidebarOpen,
  onLogout,
}) {
  return (
    <>
      {/* DESKTOP NAVBAR */}
      <header className="navbar">

        <div className="navbar-logo">
          <span className="nia-mark">✦</span>
          <Link to="/">NIA</Link>
        </div>

        <nav className="desktop-nav">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/offmap">Off Map</Link>
          <Link to="/history">History</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/favorites">Favourites</Link>
          <Link to="/add-place">Add A Place</Link>
        </nav>

        <div className="navbar-user">
          <span>
            Hi, {user?.name || "Guest"}
          </span>

          {/* <button onClick={onLogout}>
            Logout
          </button> */}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="hamburger"
          onClick={() => setSidebarOpen(true)}
        >
          ☰
        </button>

      </header>


      {/* MOBILE SIDEBAR */}
      <aside
        className={`mobile-sidebar ${
          sidebarOpen ? "open" : ""
        }`}
      >

        <div className="sidebar-header">
          <span className="nia-mark">✦</span>
          <strong>NIA</strong>

          <button
            className="close-sidebar"
            onClick={() => setSidebarOpen(false)}
          >
            ×
          </button>

        </div>


        {/* USER */}
        <div className="sidebar-user">

          <div className="user-avatar">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>

          <div>
            <strong>{user?.name || "Guest"}</strong>
            <p>{user?.email || ""}</p>
          </div>

        </div>


        {/* NAVIGATION */}
        <nav className="sidebar-nav">

          <Link
            to="/home"
            onClick={() => setSidebarOpen(false)}
          >
            Explore
          </Link>

          <Link
            to="/offmap"
            onClick={() => setSidebarOpen(false)}
          >
            Off Map
          </Link>

          <Link
            to="/history"
            onClick={() => setSidebarOpen(false)}
          >
            History
          </Link>

          <Link
            to="/favorites"
            onClick={() => setSidebarOpen(false)}
          >
            Favourites
          </Link>

          <Link
            to="/profile"
            onClick={() => setSidebarOpen(false)}
          >
            Profile
          </Link>

          <Link
            to="add-place"
            onClick={() => setSidebarOpen(false)}
          >
            Add a Place
          </Link>

        </nav>
        
        <button
          className="sidebar-logout"
          onClick={onLogout}
        >
          Logout
        </button>

      </aside>


      {/* DARK OVERLAY */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

    </>
  );
}