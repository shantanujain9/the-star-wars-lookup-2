import React, { useState, useEffect } from "react";
import "../site.css";
import { Link } from "react-router-dom";
import Search from "./Search";

const Index = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/characters");
        if (!response.ok) {
          throw new Error("Data could not be fetched!");
        }
        const json_response = await response.json();
        setData(json_response);
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <>
        <Search setData={setData} />
      </>
      {data && (
        <section id="charactersList">
          <>
            {data.map((character) => (
              <div key={character.id}>
                <Link to={`/characters/${character.id}`}>{character.name}</Link>
              </div>
            ))}
          </>
        </section>
      )}
    </>
  );
};
export default Index;