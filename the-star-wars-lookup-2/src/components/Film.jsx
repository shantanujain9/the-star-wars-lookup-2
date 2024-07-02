import React, { useState, useEffect } from "react";
import "../site.css";

const Film = (props) => {
  const filmId = props.id;
  const [data, setData] = useState();
  const [characters, setCharacters] = useState([]);
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
        console.log(json_response);
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };
    const apiUrl = "http://localhost:3000/api";
    fetchData(`${apiUrl}/films/${filmId}`, setData);
    fetchData(`${apiUrl}/films/${filmId}/characters`, setCharacters);
    fetchData(`${apiUrl}/films/${filmId}/planets`, setPlanets);
  }, []);
  return (
    <>
      {data && characters && planets && (
        <>
          <h1 id="name"></h1>
          <section id="generalInfo">
            <p>
              Producer: {data.producer}
              <span id="producer"></span>
            </p>
            <p>
              Title: {data.title}
              <span id="title"></span>
            </p>
            <p>Episode ID: {data.episode_id}</p>
            <p>
              Director: {data.director}
              <span id="director"></span>
            </p>
            <p>
              Release Date: {data.release_date}
              <span id="release_date"></span>
            </p>
            <p>
              Opening Crawl: {data.opening_crawl}
              <span id="OpeningCrawl"></span>
            </p>
          </section>
          <h2>Character List</h2>
          <section id="charactersList">
            {characters.map((character) => {
              return (
                <div
                  onClick={() => {
                    console.log("Hello World!");
                  }}
                >
                  {character.name}
                </div>
              );
            })}
          </section>
          <h2>Planet List</h2>
          <section id="planetList">
            {planets.map((planet) => {
              return (
                <div
                  onClick={() => {
                    console.log("Hello World!");
                  }}
                >
                  {planet.name}
                </div>
              );
            })}
          </section>
        </>
      )}
    </>
  );
};
export default Film;