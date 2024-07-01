let nameH1;
let charactersDiv;
let filmsDiv;
const baseUrl = `https://swapi2.azurewebsites.net/api`;

addEventListener('DOMContentLoaded', () => {
    nameH1 = document.querySelector('h1#name');
    charactersUl = document.querySelector('#characters>ul');
    filmsUl = document.querySelector('#films>ul');
    const sp = new URLSearchParams(window.location.search)
    const id = sp.get('id')
    getPlanet(id)
  });

  async function getPlanet(id) {
    let planet;
    try {
      planet = await fetchPlanet(id)
      planet.characters = await fetchCharacter(planet)
      planet.films = await fetchFilms(planet)
    }
    catch (ex) {
      console.error(`Error reading planet ${id} data.`, ex.message);
    }
    renderPlanet(planet);
  
  }

  async function fetchPlanet(id) {
    let planetUrl = `${baseUrl}/planets/${id}`;
    return await fetch(planetUrl)
      .then(res => res.json())
  }
  
  async function fetchCharacter(planet) {
    const url = `${baseUrl}/planets/${planet?.id}/characters`;
    const characters = await fetch(url)
      .then(res => res.json())
    return characters;
  }
  
  async function fetchFilms(planet) {
    const url = `${baseUrl}/planets/${planet?.id}/films`;
    const films = await fetch(url)
      .then(res => res.json())
    return films;
  }
  
  const renderPlanet = planet => {
    document.title = `SWAPI - ${planet?.name}`;  // Just to make the browser tab say their name
    nameH1.textContent = planet?.name;
    const cLis = planet?.characters?.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`)
    const filmsLis = planet?.films?.map(film => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`)
    charactersUl.innerHTML = cLis.join("");
    filmsUl.innerHTML = filmsLis.join("");
    
  }
  