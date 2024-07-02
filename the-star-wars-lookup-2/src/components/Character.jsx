import React, { useState, useEffect } from "react";
import "../site.css";
import { Link } from "react-router-dom";

const Character = (props) => {
  const characterId = props.id;
  const [data, setData] = useState();
  const [films, setFilms] = useState([]);
  const [planets, setPlanets] = useState([]);
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
    const apiUrl = "http://localhost:3000/api/characters";
    fetchData(`${apiUrl}/${characterId}`, setData);
    fetchData(`${apiUrl}/${characterId}/films`, setFilms);
    fetchData(`${apiUrl}/${characterId}/planets`, setPlanets);
  }, []);

  return (
    <>
      {data && films && planets && (
        <>
          <h1 id="name">{data.name}</h1>
          <section id="generalInfo">
            <p>
              Gender: {data.gender}
              <span id="gender"></span>
            </p>
            <p>
              Skin Color: {data.skin_color}
              <span id="skin_color"></span>
            </p>
            <p>
              Hair Color: {data.hair_color}
              <span id="hair_color"></span>
            </p>
            <p>
              Birth Year: {data.birth_year}
              <span id="birth_year"></span>
            </p>
            <p>
              Height: {data.height}
              <span id="height"></span>
            </p>
            <p>
              Mass: {data.mass}
              <span id="mass"></span>
            </p>
          </section>
          <h2>Homeworld</h2>
          <section id="planetList">
            {planets.map((planet) => {
              return (
                <div key={planet.id}>
                  <Link to={`/planets/${planet.id}`}>{planet.name}</Link>
                </div>
              );
            })}
          </section>
          <h2>Films Appeared In</h2>
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
export default Character;