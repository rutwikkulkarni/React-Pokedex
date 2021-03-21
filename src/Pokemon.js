import React, {useEffect, useRef, useState, useCallback} from 'react';

function Pokemon(props){
  var pokemonData = useRef({
    sprite: "",
    name: "",
    number: 0,
  });
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), [])

  function fetchPokemon(){
    fetch("https://pokeapi.co/api/v2/pokemon/" + props.number)
    .then(response => response.json())
    .then(data => {
      pokemonData.current.sprite = data.sprites.front_default;
      pokemonData.current.name = data.name;
      pokemonData.current.number = props.number;
      forceUpdate();
    })
    .catch(error => console.log(error)); 
  }

  useEffect(() => {
    if(pokemonData.current.number === 0){
        console.log("Loading...");
        setInterval(fetchPokemon, 1000);
    }
  });

  return(
    <div className="Pokemon-Entry">
    <img src={pokemonData.current.sprite} alt={pokemonData.current.name}></img>
    <h2>{pokemonData.current.name}</h2>
    <h2>{pokemonData.current.number}</h2>
    </div>
  );
}

export default Pokemon;