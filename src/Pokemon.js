import React, {useEffect, useRef, useState, useCallback} from 'react';

const Pokemon = (props) => {
  let pokemonData = useRef({
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
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

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
      pokemonData.current.sprite  = "https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/" + padNumber(props.number, 3) + ".png";
      pokemonData.current.name    = data.name[0].toUpperCase() + data.name.substr(1, data.name.length);
      pokemonData.current.number  = props.number;
      pokemonData.current.types   = data.types;
      forceUpdate();
    })
    .catch(error => console.log(error)); 
  }

  useEffect(() => {
    if(pokemonData.current.number === 0){
        setInterval(fetchPokemon, 1000);
    }
  });

  return(
    <div className="pokemon-entry">
      <header>
        <div className={"pokemon-entry-header type-" + pokemonData.current.types[0].type.name}>
          <h2 id="pokemon-name">{pokemonData.current.name}</h2>
          <h2 id="pokemon-number">{pokemonData.current.number}</h2>
        </div>
      </header>
      <div className="pokemon-entry-content">
        <img className = "pokemon-thumbnail" src={pokemonData.current.sprite} alt={pokemonData.current.name}></img>
        <div className = "pokemon-types-list">
          {pokemonData.current.types.map((i, index) => <li key={index.toString()} className={"pokemon-type-entry type-text-" + i.type.name}>{i.type.name.toUpperCase()}</li>)}
        </div>
      </div>
    </div>
  );
}

export default Pokemon;