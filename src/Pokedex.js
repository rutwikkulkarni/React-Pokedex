import React, {useState} from 'react'
import Pokemon from './Pokemon'

const Pokedex = () => {
  
  const makePokedexInRange = (start, end) => {
    let arr = [];
    for(let i = start; i <= end; i++){
      arr.push(i);
    }
    return arr;
  }
    
  const [pokedex, setPokedex] = useState(makePokedexInRange(1, 151));

  const genChange = () => {
    let element = document.getElementById("gen-select");
    console.log(element.value);
    if(element.value === "1"){
      setPokedex(makePokedexInRange(1, 151));
    }
    else if(element.value === "2"){
      setPokedex(makePokedexInRange(152, 251));
    }
    else if(element.value === "3"){
      setPokedex(makePokedexInRange(252, 386));
    }
    else if(element.value === "4"){
      setPokedex(makePokedexInRange(387, 493));
    }
  }

  const searchPokemon = () => {
    let searchValue = document.getElementById("pokemon-search");
    let potentialResults = document.getElementsByClassName("pokemon-name");
    for(let item of potentialResults){
      if(item.innerHTML.toString().startsWith(searchValue.value)){
        console.log(item.innerText);
      }
    }
  }

  return(
    <div>
      <div className="pokedex-options">
        <input type="text" id="pokemon-search" name="pokemon-search" placeholder="Search" onInput={searchPokemon}></input>
        <select name="gen-select" id="gen-select" onChange={genChange}>
          <option value="1">Gen I</option>
          <option value="2">Gen II</option>
          <option value="3">Gen III</option>
          <option value="4">Gen IV</option>
        </select>
      </div>
      <div className="pokedex-container">
        {pokedex.map((i) => <Pokemon number={i} /> )}
      </div>
    </div>
  );
}

export default Pokedex;