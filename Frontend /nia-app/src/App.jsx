import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import places from "./data/places";
import PlaceCard from "./components/placeCard";
import PlaceDetails from "./pages/placeDetails";

function Home() {
  return (
    <>
      <header className="hero">
        <nav className="navbar">
          <Link to="/" className="logo">
            Nia
          </Link>
        </nav>

        <div className="hero-content">
          <h1>Discover Kenya</h1>
          <p>Explore Kenya's most beautiful historical, cultural, and natural places.</p>
        </div>
      </header>

      <main className="places-container">
        <h2>Featured Places</h2>

        <div className="places-grid">
          {places.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      </main>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/places/:id" element={<PlaceDetails />} />
        <Route
          path="*"
          element={
            <main className="place-not-found">
              <h1>Page Not Found</h1>
              <Link to="/">Back to Home</Link>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;