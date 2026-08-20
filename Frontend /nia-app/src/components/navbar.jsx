function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">
          Nia
        </a>

        <nav className="navbar-links">
          <a href="/">Discover</a>
          <a href="/explore">Explore</a>
          <a href="/categories">Categories</a>
        </nav>

        <div className="navbar-actions">
          <a href="/business" className="business-link">
            List Your Business
          </a>

          <a href="/login" className="login-link">
            Log in
          </a>
        </div>
      </div>
    </header>
  );
}

export default Navbar;