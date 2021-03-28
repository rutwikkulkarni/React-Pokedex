import React from 'react';
import './App.css';
import Header from './Header.js';
import Pokemon from './Pokemon.js';

function Pokedex() {

  const makePokedex = (count) => {
    pokedex = [];
    for(let i = 1; i <= count; i++){
      pokedex.push(i);
    }
    return pokedex;
  }

  const makePokedexInRange = (start, end) => {
    pokedex = [];
    for(let i = start; i <= end; i++){
      pokedex.push(i);
    }
    return pokedex;
  }

  var pokedex = makePokedexInRange(1, 50);

  return (
    <div className="app">
      <Header />
      <div className="pokemon-content-container">
        <div className="pokemon-info-container" id="pokemon-info">
          <h1>test</h1>
          <p>another test</p>
        </div>
        <div className="pokedex-container">
          {pokedex.map((i) => <Pokemon number={i} /> )}
        </div>
      </div>
    </div>
  );
}

export default Pokedex;
