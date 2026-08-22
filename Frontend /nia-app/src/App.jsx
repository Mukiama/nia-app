import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Logout from "./pages/logout";
import PlaceDetails from "./pages/placeDetails";
import Hero from "./pages/hero";
import "./App.css";

export default function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/logout" element={<Logout />} />

        <Route path="/places/:id" element={<PlaceDetails />} />

        <Route path="/hero" element={<Hero />} />
      </Routes>
    
  );
}