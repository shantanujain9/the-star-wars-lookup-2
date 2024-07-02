import React, { useState, useEffect } from "react";
import "./App.css";
import Character from "./components/Characters";
import character_data from "./assets/characters.json";
import Film from "./components/Film.jsx";
import Index from "./components/Index.jsx";
import Planet from "./components/Planet.jsx";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useParams,
} from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <div>
          <Link to="/">Home</Link>
        </div>
        <Routes>
          <Route exact path="/" element={<Index />} />
          <Route path="/characters/:id" element={<CharacterWrapper />} />
          <Route path="/films/:id" element={<FilmWrapper />} />
          <Route path="/planets/:id" element={<PlanetWrapper />} />
        </Routes>
      </Router>
    </>
  );
}

function CharacterWrapper() {
  const { id } = useParams();
  return <Character id={id} />;
}

function FilmWrapper() {
  const { id } = useParams();
  return <Film id={id} />;
}

function PlanetWrapper() {
  const { id } = useParams();
  return <Planet id={id} />;
}
export default App;