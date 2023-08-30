import "./App.css";
import React from "react";
import LandingPage from "./components/LandingPage";
import DetailsPage from "./components/DetailsPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/details/:pokemonName" element={<DetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
