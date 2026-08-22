<<<<<<< HEAD
import { BrowserRouter, Routes, Route } from "react-router-dom";
=======
import { useState } from "react";
import SearchBar from "./components/searchBar.jsx";
import FilterBar from "./components/filterBar.jsx";
<<<<<<< HEAD
import Signup from "./pages /signup.jsx";
import './Landing.css'
>>>>>>> ea77a42 (Sign up page styling)
=======
import LandingPage from "./pages /LandingPage.jsx";
import './Landing.css'

>>>>>>> landing

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

<<<<<<< HEAD
        <Route path="/login" element={<Login />} />
=======
      <SearchBar onSearch={setSearchText} />
      <FilterBar categories={categories} counties={counties} onFilterChange={setFilters} />
>>>>>>> landing

        <Route path="/signup" element={<Signup />} />

        <Route path="/logout" element={<Logout />} />

        <Route path="/places" element={<PlaceDetails />} />

        <Route path="/hero" element={<Hero />} />
      </Routes>
    
  );
}