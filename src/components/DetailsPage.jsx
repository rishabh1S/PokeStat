import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import calculateDefense from "../utils/calculateDefense";
import Navbar from "./Navbar";

function DetailsPage() {
  const { pokemonName } = useParams();
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [pokedexEntries, setPokedexEntries] = useState([]);
  const [pokedexData, setPokedexData] = useState({
    base_happiness: null,
    capture_rate: null,
    egg_groups: [],
    color: "",
    gender_rate: -1,
    generation: "",
    growth_rate: "",
  });

  const history = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        );
        setPokemonDetails(response.data);

        const speciesResponse = await axios.get(
          `https://pokeapi.co/api/v2/pokemon-species/${response.data.id}/`
        );
        setPokedexEntries(
          speciesResponse.data.flavor_text_entries.filter(
            (entry) => entry.language.name === "en"
          )
        );
        setPokedexData({
          base_happiness: speciesResponse.data.base_happiness,
          capture_rate: speciesResponse.data.capture_rate,
          egg_groups: speciesResponse.data.egg_groups.map(
            (group) => group.name
          ),
          color: speciesResponse.data.color.name,
          gender_rate: speciesResponse.data.gender_rate,
          generation: speciesResponse.data.generation.name,
          growth_rate: speciesResponse.data.growth_rate.name,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [pokemonName]);

  // Function to fetch Pokemon details by ID
  const fetchPokemonDetailsById = async (id) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      setPokemonDetails(response.data);
      history(`/details/${response.data.name}`);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const goToPreviousPokemon = () => {
    if (pokemonDetails && pokemonDetails.id > 1) {
      const previousPokemonId = pokemonDetails.id - 1;
      fetchPokemonDetailsById(previousPokemonId);
    }
  };

  const goToNextPokemon = () => {
    if (pokemonDetails) {
      const nextPokemonId = pokemonDetails.id + 1;
      fetchPokemonDetailsById(nextPokemonId);
    }
  };

  if (!pokemonDetails) {
    return (
      <div className="loading-container">
        <div class="spinner-grow text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow text-secondary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow text-success" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow text-warning" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow text-info" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow text-light" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow text-dark" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const { stats, types, id, name, height, weight, abilities } = pokemonDetails;

  return (
    <div>
      <Navbar />
      <div>
        <div className="container my-1">
          <div className="row align-items-stretch">
            <div className="col-md-4 my-3">
              <h2 className="text-center">Base Stats</h2>
              <table className="table table-hover table-dark font-monospace">
                <tbody>
                  {stats.map((stat) => (
                    <tr className="text-capitalize" key={stat.stat.name}>
                      <td>{stat.stat.name}</td>
                      <td>{stat.base_stat}</td>
                    </tr>
                  ))}
                  <tr>
                    <td>Total</td>
                    <td>
                      {stats.reduce((total, stat) => total + stat.base_stat, 0)}
                    </td>
                  </tr>
                </tbody>
              </table>
              <h2>Type Defence</h2>
              <table className="table table-dark table-hover table-bordered font-monospace">
                <thead>
                  <tr className="text-center">
                    <th></th>
                    <th
                      style={{ backgroundColor: "#2e3436", color: "#ffdd57" }}
                    >
                      0
                    </th>
                    <th
                      style={{ backgroundColor: "#a40000", color: "#ffdd57" }}
                    >
                      1/2
                    </th>
                    <th
                      style={{ backgroundColor: "#4e9a06", color: "#ffdd57" }}
                    >
                      2
                    </th>
                  </tr>
                </thead>
                <tbody className="text-uppercase">
                  {types.map((type) => (
                    <tr key={type.type.name}>
                      <td>
                        <div className={`badge type-${type.type.name}`}>
                          {type.type.name}
                        </div>
                      </td>
                      <td>
                        <div className="type-list">
                          {calculateDefense(type.type.name).notEffective.map(
                            (t) => (
                              <div key={t} className={`badge type-${t} me-1`}>
                                {t}
                              </div>
                            )
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="type-list">
                          {calculateDefense(
                            type.type.name
                          ).notVeryEffective.map((t) => (
                            <div key={t} className={`badge type-${t} me-1`}>
                              {t}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td>
                        <div className="type-list">
                          {calculateDefense(type.type.name).superEffective.map(
                            (t) => (
                              <div key={t} className={`badge type-${t} me-1`}>
                                {t}
                              </div>
                            )
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div class="col-md-4 d-flex flex-column align-items-center justify-content-around">
              <div class="d-flex justify-content-between m-2 w-100">
                <button
                  type="button"
                  className="btn scale-up-div"
                  onClick={goToPreviousPokemon}
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <h1 className="text-capitalize fw-bold text-body-emphasis">
                  {name}
                </h1>
                <button
                  type="button"
                  className="btn scale-up-div"
                  onClick={goToNextPokemon}
                >
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </div>
              <img
                src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${id}.svg`}
                alt={`Sprite of ${name}`}
                className="poke-img"
              />
            </div>
            <div class="col-md-4 my-3">
              <h2 className="text-center">Pokédex data</h2>
              <table className="table table-hover table-dark font-monospace">
                <tbody>
                  <tr className="text-capitalize">
                    <td>Generation:</td>
                    <td className="text-uppercase">
                      {pokedexData.generation.replace("generation-", "")}
                    </td>
                  </tr>
                  <tr>
                    <td>Types:</td>
                    <td className="text-uppercase">
                      <div className="d-flex align-items-center">
                        <div>
                          {types.map((type) => (
                            <span
                              key={type.type.name}
                              className={`badge me-2 type-${type.type.name}`}
                            >
                              {type.type.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Height:</td>
                    <td>{height / 10} m</td>
                  </tr>
                  <tr>
                    <td>Weight:</td>
                    <td>{weight / 10} kg</td>
                  </tr>
                  <tr>
                    <td>Base Experience:</td>
                    <td>{pokemonDetails.base_experience}</td>
                  </tr>
                  <tr>
                    <td>Base Happiness:</td>
                    <td>{pokedexData.base_happiness}</td>
                  </tr>
                  <tr>
                    <td>Capture Rate:</td>
                    <td>{pokedexData.capture_rate}</td>
                  </tr>
                  <tr>
                    <td>Egg Groups:</td>
                    <td>{pokedexData.egg_groups.join(", ")}</td>
                  </tr>
                  <tr>
                    <td>Color:</td>
                    <td>{pokedexData.color}</td>
                  </tr>
                  <tr>
                    <td>Gender Rate:</td>
                    <td>
                      {pokedexData.gender_rate === -1 ? (
                        <span style={{ color: "green", fontWeight: "bold" }}>
                          Genderless
                        </span>
                      ) : (
                        <>
                          <span
                            style={{ color: "#3273dc", fontWeight: "bold" }}
                          >
                            {`${(
                              (1 - pokedexData.gender_rate / 8) *
                              100
                            ).toFixed(2)}% Male`}
                          </span>
                          ,
                          <span
                            style={{ color: "#ff6bce", fontWeight: "bold" }}
                          >
                            {`${((pokedexData.gender_rate / 8) * 100).toFixed(
                              2
                            )}% `}
                            Female
                          </span>
                        </>
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td>Growth Rate:</td>
                    <td>{pokedexData.growth_rate}</td>
                  </tr>
                  <tr>
                    <td>Abilities:</td>
                    <td>
                      {abilities.map((ability, index) => (
                        <span key={index}>
                          {ability.ability.name}
                          {ability.is_hidden && <> (hidden ability)</>}
                          {index < abilities.length - 1 && (
                            <>
                              <br />
                            </>
                          )}
                        </span>
                      ))}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="d-flex flex-column justify-content-center align-items-center">
                <div className="p-2">
                  <h2 className="text-center">Pokédex-Entries</h2>
                  <table className="table table-dark table-hover font-monospace">
                    <tbody>
                      {pokedexEntries.map((entry) => (
                        <tr key={entry.version.name}>
                          <td>{entry.version.name}</td>
                          <td>{entry.flavor_text}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
