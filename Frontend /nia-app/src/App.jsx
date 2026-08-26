<<<<<<< HEAD
<<<<<<< HEAD
import { Routes, Route } from "react-router-dom";

import AppLayout from "./components/AppLayout";
=======
import { useState } from "react";
import SearchBar from "./components/searchBar.jsx";
import FilterBar from "./components/filterBar.jsx";
import LandingPage from "./pages /LandingPage.jsx";
=======
// import { useState } from "react";
// import SearchBar from "./components/searchBar.jsx";
// import FilterBar from "./components/filterBar.jsx";
// import LandingPage from "./pages /LandingPage.jsx";
>>>>>>> 4873e06 (Minor changes)


import { BrowserRouter, Routes, Route } from "react-router-dom";
>>>>>>> 8e99171 (Minor correction)

import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Logout from "./pages/logout";
import PlaceDetails from "./pages/placeDetails";
import Hero from "./pages/hero";
<<<<<<< HEAD
import Dashboard from "./pages/dashboard";
import About from "./pages/About";
// import Profile from "./pages/profile";
import History from "./pages/history";
import Filter from "./pages/filter";
import Favorites from "./pages/favorites";
import OffMap from "./pages/offmap";
import AddPlace from "./pages/addPlace";
import NiaPicks from "./pages/niaPicks";

=======
import Profile from "./pages/profile";
>>>>>>> 8e99171 (Minor correction)
import "./App.css";

export default function App() {
  return (
<<<<<<< HEAD
    <Routes>
      <Route path="" element={<Home />} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/hero" element={<Hero />} />
      <Route path="/nia-picks" element={<NiaPicks />} />
      <Route path="/about" element={<About />} />

    <Route element={<AppLayout />}>
      
      <Route path="/logout" element={<Logout />} />
      <Route path="/add-place" element={<AddPlace />} />
      <Route path="/places/:id" element={<PlaceDetails />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/history" element={<History />} />
      <Route path="/filter" element={<Filter />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/offmap" element={<OffMap />} />
      
    </Route>
      
    </Routes>
=======
    
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/logout" element={<Logout />} />

        <Route path="/places" element={<PlaceDetails />} />

        <Route path="/hero" element={<Hero />} />

        <Route path="/profile" element={<Profile />} />
      </Routes>
    
>>>>>>> 8e99171 (Minor correction)
  );
}
