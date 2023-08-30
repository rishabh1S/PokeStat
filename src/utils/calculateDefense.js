const getTypeEffectiveness = (pokemonType) => {
  const typeChart = {
    normal: {
      notEffective: ["ghost"],
      notVeryEffective: [],
      superEffective: ["fighting"],
    },
    fire: {
      notEffective: [],
      notVeryEffective: ["fire", "grass", "ice", "bug", "steel"],
      superEffective: ["water", "ground", "rock"],
    },
    water: {
      notEffective: [],
      notVeryEffective: ["fire", "water", "ice", "steel"],
      superEffective: ["electric", "grass"],
    },
    electric: {
      notEffective: [],
      notVeryEffective: ["electric", "flying", "steel"],
      superEffective: ["ground"],
    },
    grass: {
      notEffective: [],
      notVeryEffective: ["water", "electric", "grass", "ground"],
      superEffective: ["fire", "ice", "poison", "flying", "bug"],
    },
    ice: {
      notEffective: [],
      notVeryEffective: ["ice"],
      superEffective: ["fire", "fighting", "rock", "steel"],
    },
    fighting: {
      notEffective: [],
      notVeryEffective: ["bug", "rock", "dark"],
      superEffective: ["flying", "psychic"],
    },
    poison: {
      notEffective: ["steel"],
      notVeryEffective: ["grass", "fighting", "poison", "bug"],
      superEffective: ["ground", "psychic"],
    },
    ground: {
      notEffective: ["electric"],
      notVeryEffective: ["poison", "rock"],
      superEffective: ["water", "grass", "ice"],
    },
    flying: {
      notEffective: ["ground"],
      notVeryEffective: ["grass", "fighting", "bug"],
      superEffective: ["electric", "ice", "rock"],
    },
    psychic: {
      notEffective: [],
      notVeryEffective: ["fighting", "psychic"],
      superEffective: ["bug", "ghost", "dark"],
    },
    bug: {
      notEffective: [],
      notVeryEffective: ["grass", "fighting", "ground"],
      superEffective: ["fire", "flying"],
    },
    rock: {
      notEffective: [],
      notVeryEffective: ["normal", "fire", "poison", "flying"],
      superEffective: ["water", "grass", "fighting", "ground"],
    },
    ghost: {
      notEffective: ["normal"],
      notVeryEffective: ["dark"],
      superEffective: ["psychic", "ghost"],
    },
    dragon: {
      notEffective: [],
      notVeryEffective: ["fire", "water", "electric", "grass"],
      superEffective: ["ice", "dragon"],
    },
    dark: {
      notEffective: ["psychic"],
      notVeryEffective: ["ghost", "dark"],
      superEffective: ["fighting", "bug"],
    },
    steel: {
      notEffective: ["poison"],
      notVeryEffective: [
        "normal",
        "grass",
        "ice",
        "flying",
        "psychic",
        "bug",
        "rock",
        "dragon",
        "steel",
      ],
      superEffective: ["fire", "figthing", "ground"],
    },
  };

  const type = pokemonType.toLowerCase();

  if (typeChart[type]) {
    return {
      notEffective: typeChart[type].notEffective,
      notVeryEffective: typeChart[type].notVeryEffective,
      normal: ["normal"],
      superEffective: typeChart[type].superEffective,
    };
  } else {
    return "Invalid Pokémon type";
  }
};

// eslint-disable-next-line no-unused-vars
const calculateDefense = (pokemonType) => {
  const effectiveness = getTypeEffectiveness(pokemonType);
  const defense = {
    notEffective: effectiveness.notEffective,
    notVeryEffective: effectiveness.notVeryEffective,
    normal: effectiveness.normal,
    superEffective: effectiveness.superEffective,
  };
  return defense;
};

export default calculateDefense;
