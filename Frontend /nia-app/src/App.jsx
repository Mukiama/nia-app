import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Logout from "./pages/logout";
import PlaceDetails from "./pages/placeDetails";
import Hero from "./pages/hero";
import Profile from "./pages/profile";
import OffMap from "./pages/offmap";
import "./App.css";

export default function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/logout" element={<Logout />} />

        <Route path="/places" element={<PlaceDetails />} />

        <Route path="/hero" element={<Hero />} />

        <Route path="/profile" element={<Profile />} />
        
        <Route path="/offmap" element={<OffMap />} />
        
      </Routes>
    
  );
}