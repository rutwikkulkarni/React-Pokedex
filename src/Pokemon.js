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
    ],
    enabled: true
  });

  useEffect(() => {
    setPokemonData(props.pokemonData);
  }, []);

  const goToInfo = () => {
    
  }

  return(
    <div className="pokemon-entry" onClick={goToInfo} id={props.pokemonData.number}>
      <header>
        <div className={"pokemon-entry-header type-" + pokemonData.types[0].type.name}>
          <h2 className="pokemon-name">{pokemonData.name}</h2>
          <h2 className="pokemon-number">{pokemonData.number}</h2>
        </div>
      </header>
      <div className="pokemon-entry-content">
        <img className = "pokemon-thumbnail" src={pokemonData.sprite} alt={pokemonData.name} id={"image-" + props.pokemonData.number}></img>
        <div className = "pokemon-types-list">
          {pokemonData.types.map((i, index) => <li key={index.toString()} className={"pokemon-type-entry type-text-" + i.type.name}>{i.type.name.toUpperCase()}</li>)}
        </div>
      </div>
    </div>
  );
}

export default Pokemon;