import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import {useParams} from 'react-router-dom'

const PokemonDetailsPage = () => {
  let {id} = useParams();
  let [pokemonInfo, setPokemonInfo] = useState({
    name: "Default",
    sprite: "",
    id: 0,
    height: 0,
    weight: 0,
    base_exp: 0,
    hp: 0,
    attack: 0,
    defence: 0,
    special_attack: 0,
    special_defence: 0,
    speed: 0,
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
    .then(data => {
      console.log(data);
      let pokemonData = {
        name:            data.name,
        id:              data.id,
        height:          data.height,
        weight:          data.weight,
        base_exp:        data.base_experience,
        hp:              data.stats[0].base_stat,
        attack:          data.stats[1].base_stat,
        defence:         data.stats[2].base_stat,
        special_attack:  data.stats[3].base_stat,
        special_defence: data.stats[4].base_stat,
        speed:           data.stats[5].base_stat,
        types:           data.types
      };
      console.log(pokemonData);
      setPokemonInfo(pokemonData);
    });
  }, []);

  const padNumber = (number, length) => {
    let str = "" + number;
    while(str.length < length){
      str = "0" + str;
    }
    return str;
  }

  return (
    <div className={"pokemon-details-area"}>
      <Link className="home-link" to="/">Go Back</Link>
      <div className="pokemon-details-container">
        <div className={"pokemon-details-header type-" + pokemonInfo.types[0].type.name}>
          <h2 className="pokemon-details-name">{pokemonInfo.name.toUpperCase()[0] + pokemonInfo.name.substr(1, pokemonInfo.name.length)}</h2>
          <h2 className="pokemon-details-number">{pokemonInfo.id}</h2>
        </div>
        <div className="pokemon-details-content">
          <div className="pokemon-details-image">
            <img className="pokemon-img-src" src={"https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/" + padNumber(pokemonInfo.id, 3) + ".png"}></img>
          </div> 
          <div className="pokemon-details-data">
            <h3 className="pokemon-details-text">Height</h3>
            <p>{pokemonInfo.height}</p>
            <h3 className="pokemon-details-text">Weight</h3>
            <p>{pokemonInfo.weight}</p>
            <h3 className="pokemon-details-text">Base exp</h3>
            <p>{pokemonInfo.base_exp}</p>
            <h3 className="pokemon-details-text">HP</h3>
            <p>{pokemonInfo.weight}</p>
            <h3 className="pokemon-details-text">Attack</h3>
            <p>{pokemonInfo.attack}</p>
            <h3 className="pokemon-details-text">Defence</h3>
            <p>{pokemonInfo.defence}</p>
            <h3 className="pokemon-details-text">Special Attack</h3>
            <p>{pokemonInfo.special_attack}</p>
            <h3 className="pokemon-details-text">Special Defence</h3>
            <p>{pokemonInfo.special_defence}</p>
            <h3 className="pokemon-details-text">Speed</h3>
            <p>{pokemonInfo.speed}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetailsPage;