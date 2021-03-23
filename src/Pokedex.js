import React from 'react';
import './App.css';
import Header from './Header.js';
import Pokemon from './Pokemon.js';

function Pokedex() {

  function makePokedex(count){
    pokedex = [];
    for(var i = 1; i <= count; i++){
      pokedex.push(i);
    }
    console.log(pokedex)
    return pokedex;
  }

  var pokedex = makePokedex(10);

  return (
    <div className="app">
      <Header />
      <div className="pokedex-container">
        {pokedex.map((i) => <Pokemon number={i} /> )}
      </div>
    </div>
  );
}

export default Pokedex;
