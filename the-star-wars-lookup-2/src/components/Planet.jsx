import React, { useState, useEffect } from "react";
import "../site.css";
import { Link } from "react-router-dom";

const Planet = (props) => {
  const planetId = props.id;
  const [data, setData] = useState();
  const [characters, setCharacters] = useState([]);
  const [films, setFilms] = useState([]);
  useEffect(() => {
    const fetchData = async (url, setFunc) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Data could not be fetched!");
        }
        const json_response = await response.json();
        setFunc(json_response);
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };
    const url = `http://localhost:3000/api/planets/${planetId}`;
    fetchData(url, setData);
    fetchData(`${url}/characters`, setCharacters);
    fetchData(`${url}/films`, setFilms);
  }, []);
  return (
    <>
      {data && characters && films && (
        <>
          <h1 id="name">{data.name}</h1>
          <section id="generalInfo">
            <p>
              Climate: {data.climate} <span id="climate"></span>
            </p>
            <p>
              Has Surface Water: {data.surface_water}{" "}
              <span id="surface_water"></span>
            </p>
            <p>
              Diameter: {data.diameter}
              <span id="diameter"></span> km
            </p>
            <p>
              Rotation Period: {data.rotation_period}
              <span id="rotation_period"></span> hours
            </p>
            <p>
              Gravity: {data.gravity}
              <span id="gravity"></span>
            </p>
            <p>
              Orbital Period: {data.orbital_period}{" "}
              <span id="orbital_period"></span> days
            </p>
            <p>
              Population: {data.population} <span id="population"></span>
            </p>
            <p>
              Terrain: {data.terrain} <span id="population"></span>
            </p>
          </section>
          <h2>Character List</h2>
          <section id="charactersList">
            {characters.map((character) => {
              return (
                <div key={character.id}>
                  <Link to={`/characters/${character.id}`}>
                    {character.name}
                  </Link>
                </div>
              );
            })}
          </section>
          <h2>Film List</h2>
          <section id="filmsList">
            {films.map((film) => {
              return (
                <div key={film.id}>
                  <Link to={`/films/${film.id}`}>{film.title}</Link>
                </div>
              );
            })}
          </section>
        </>
      )}
    </>
  );
};

export default Planet;
