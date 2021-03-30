import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'

const PokemonDetailsPage = () => {
  let {id} = useParams();
  let [pokemonInfo, setPokemonInfo] = useState({
    name: "Default",
    sprite: "",
    id: 0,
    types: [
      {
        type:{
          name: "default"
        }
      }
    ],
  });

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/" + id)
    .then(response => response.json())
    .then(data => setPokemonInfo(data));
    console.log(pokemonInfo);
  }, []);

  return (
    <div class="pokemon-details-container">
        <div className={"type-" + pokemonInfo.types[0].type.name}>
        <h2 className="pokemon-name">{pokemonInfo.name}</h2>
        <h2 className="pokemon-number">{pokemonInfo.id}</h2>
        </div>
    </div>
  );
}

export default PokemonDetailsPage;