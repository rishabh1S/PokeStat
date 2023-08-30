import React, { useEffect, useState } from "react";
import axios from "axios";
import PokemonTable from "./PokemonTable";
import { useInView } from "react-intersection-observer";
import Navbar from "./Navbar";

function LandingPage() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [offset, setOffset] = useState(0); // Initial offset
  const [hasMore, setHasMore] = useState(true); // Check if there are more Pokémon
  const [ref, inView] = useInView(); // Intersection Observer

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`
        );
        const newPokemonList = response.data.results;

        if (newPokemonList.length === 0 || offset >= 649) {
          setHasMore(false);
          return;
        }

        setPokemonList((prevList) => [...prevList, ...newPokemonList]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (inView && hasMore) {
      fetchData();
      setOffset((prevOffset) => prevOffset + 20);
    }
  }, [inView, offset, hasMore]);

  const filteredPokemonList = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().startsWith(searchValue.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="card glass">
            <div className="card-body">
              <h2 className="card-title fw-medium text-center mb-4 display-5">
                Complete Pokémon Pokédex
                <span className="fs-5 px-2">(Gen 1 - Gen 5)</span>
              </h2>
              <div className="col-md-6 mx-auto">
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Pokemon"
                    aria-label="Search Pokemon"
                    aria-describedby="search-button"
                    value={searchValue}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>
              <div className="col-12">
                <PokemonTable pokemonList={filteredPokemonList} />
                {hasMore && <div ref={ref}></div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
