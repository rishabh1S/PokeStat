import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function PokemonTable({ pokemonList }) {
  const [pokemonDetails, setPokemonDetails] = useState([]);

  useEffect(() => {
    // Fetch additional details for each Pokemon
    const fetchPokemonDetails = async () => {
      const detailsPromises = pokemonList.map((pokemon) =>
        axios.get(pokemon.url).then((response) => response.data)
      );

      const details = await Promise.all(detailsPromises);
      setPokemonDetails(details);
    };

    fetchPokemonDetails();
  }, [pokemonList]);

  return (
    <div>
      <div className="table-responsive">
        <table className="table table-dark table-hover mb-0">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Type</th>
              <th scope="col">Total</th>
              <th scope="col">HP</th>
              <th scope="col">Attack</th>
              <th scope="col">Defense</th>
              <th scope="col">Sp. Atk</th>
              <th scope="col">Sp. Def</th>
              <th scope="col">Speed</th>
            </tr>
          </thead>
          <tbody>
            {pokemonDetails.map((pokemon) => (
              <tr key={pokemon.id} className="fs-6">
                <td className="d-flex align-items-center justify-content-around">
                  {pokemon.id}
                  <Link
                    to={`/details/${pokemon.name}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <img
                      src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
                      alt={`Sprite of ${pokemon.name}`}
                      width="50"
                      height="50"
                    />
                  </Link>
                </td>
                <td className="fw-bold text-capitalize">{pokemon.name}</td>
                <td>
                  {pokemon.types.map((type) => (
                    <span
                      key={type.type.name}
                      className={`text-uppercase badge me-2 type-${type.type.name}`}
                    >
                      {type.type.name}
                    </span>
                  ))}
                </td>
                <td className="fw-bold">
                  {pokemon.stats.reduce(
                    (total, stat) => total + stat.base_stat,
                    0
                  )}
                </td>
                <td>
                  {
                    pokemon.stats.find((stat) => stat.stat.name === "hp")
                      .base_stat
                  }
                </td>
                <td>
                  {
                    pokemon.stats.find((stat) => stat.stat.name === "attack")
                      .base_stat
                  }
                </td>
                <td>
                  {
                    pokemon.stats.find((stat) => stat.stat.name === "defense")
                      .base_stat
                  }
                </td>
                <td>
                  {
                    pokemon.stats.find(
                      (stat) => stat.stat.name === "special-attack"
                    ).base_stat
                  }
                </td>
                <td>
                  {
                    pokemon.stats.find(
                      (stat) => stat.stat.name === "special-defense"
                    ).base_stat
                  }
                </td>
                <td>
                  {
                    pokemon.stats.find((stat) => stat.stat.name === "speed")
                      .base_stat
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PokemonTable;
