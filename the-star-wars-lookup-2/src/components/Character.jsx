let nameH1;
let birthYearSpan;
let heightSpan;
let massSpan;
let filmsDiv;
let planetDiv;
const baseUrl = `https://swapi2.azurewebsites.net/api`;

 import React, {useState, useEffect} from 'react';

 const Characters = () => {
    const [characters, setCharacters] = useState([]);

    useEffect(()=> {
      const fetchCharacters = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/characters');
          const data = await response.json();
          setCharacters(data);
        } catch(error){
          console.error("Error fetching characters:",error);
        }
      };

      fetchCharacters();

 }, []);


 return (
  <div>
    {characters.map((character)=>(
      <div key={character.id}>
        {character.name}
        </div>
    ))}
  </div>
 );
};

export default Characters;