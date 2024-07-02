import React, { useState } from "react";
let matchingCharacters = [];
const Search = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/characters", {})
      .then((response) => response.json())
      .then((data) => {
        const re = new RegExp(searchTerm, "i");
        matchingCharacters = data.filter((character) =>
          re.test(character.name)
        );

        props.setData(matchingCharacters);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    console.log(searchTerm);
  };
  return (
    <form className="d-flex" role="search" onSubmit={handleSubmit}>
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        value={searchTerm}
        onChange={handleChange}
      />
      <button className="btn btn-outline-success" type="submit">
        Search
      </button>
    </form>
  );
};

export default Search;
