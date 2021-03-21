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

  var pokedex = makePokedex(50);

  return (
    <div className="App">
      <Header />
      {pokedex.map((i) => <Pokemon number={i} /> )}
    </div>
  );
}

export default Pokedex;
