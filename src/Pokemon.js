import React, {useEffect, useState} from 'react';

const Pokemon = (props) => {
  let [pokemonData, setPokemonData] = useState({
    sprite: "",
    name: "",
    number: 0,
    types: [
      {
        type:{
          name: "default"
        }
      }
    ]
  });

  const padNumber = (number, length) => {
    let str = "" + number;
    while(str.length < length){
      str = "0" + str;
    }
    return str;
  }

  const fetchPokemon = () => {
    fetch("https://pokeapi.co/api/v2/pokemon/" + props.number)
    .then(response => response.json())
    .then(data => {
      setPokemonData({
        sprite: "https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/" + padNumber(props.number, 3) + ".png",
        name: data.name[0].toUpperCase() + data.name.substr(1, data.name.length),
        number: props.number,
        types: data.types
      });
    })
    .catch(error => console.log(error)); 
  }

  useEffect(() => {
    console.log("tes");
    fetchPokemon();
  }, [props.number]);

  const goToInfo = () => {
    
  }

  return(
    <div className="pokemon-entry" onClick={goToInfo}>
      <header>
        <div className={"pokemon-entry-header type-" + pokemonData.types[0].type.name}>
          <h2 class="pokemon-name">{pokemonData.name}</h2>
          <h2 class="pokemon-number">{pokemonData.number}</h2>
        </div>
      </header>
      <div className="pokemon-entry-content">
        <img className = "pokemon-thumbnail" src={pokemonData.sprite} alt={pokemonData.name}></img>
        <div className = "pokemon-types-list">
          {pokemonData.types.map((i, index) => <li key={index.toString()} className={"pokemon-type-entry type-text-" + i.type.name}>{i.type.name.toUpperCase()}</li>)}
        </div>
      </div>
    </div>
  );
}

export default Pokemon;