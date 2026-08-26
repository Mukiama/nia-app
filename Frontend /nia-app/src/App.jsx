import { Routes, Route } from "react-router-dom";

import AppLayout from "./components/AppLayout";

import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Logout from "./pages/logout";
import PlaceDetails from "./pages/placeDetails";
import Hero from "./pages/hero";
import Dashboard from "./pages/dashboard";
import About from "./pages/About";
import Profile from "./pages/profile";
import History from "./pages/history";
import Filter from "./pages/filter";
import Favorites from "./pages/favorites";
import OffMap from "./pages/offmap";
import AddPlace from "./pages/addPlace";
import NiaPicks from "./pages/niaPicks";

import "./App.css";

export default function App() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/hero" element={<Hero />} />

    <Route element={<AppLayout />}>
      
      <Route path="/logout" element={<Logout />} />
      <Route path="/places/:id" element={<PlaceDetails />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/about" element={<About />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/history" element={<History />} />
      <Route path="/filter" element={<Filter />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/offmap" element={<OffMap />} />
      <Route path="/add-place" element={<AddPlace />} />
      <Route path="/nia-picks" element={<NiaPicks />} />
    </Route>
      
    </Routes>
  );
}