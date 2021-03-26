import React, {useEffect, useRef, useState, useCallback} from 'react';

function Pokemon(props){
  var pokemonData = useRef({
    sprite: "",
    name: "",
    number: 0,
    types: []
  });
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), [])

  function fetchPokemon(){
    fetch("https://pokeapi.co/api/v2/pokemon/" + props.number)
    .then(response => response.json())
    .then(data => {
      pokemonData.current.sprite  = data.sprites.front_default;
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
        <div className="pokemon-entry-header">
          <h2 id="pokemon-number">{pokemonData.current.number}</h2>
          <h2 id="pokemon-name">{pokemonData.current.name}</h2>
        </div>
      </header>
      <div className="pokemon-entry-content">
        <img src={pokemonData.current.sprite} alt={pokemonData.current.name}></img>
        <div className = "pokemon-types-list">
          {pokemonData.current.types.map((i, index) => <li key={index.toString()}>{i.type.name}</li>)}
        </div>
      </div>
    </div>
  );
}

export default Pokemon;