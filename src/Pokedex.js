import React, {useState, useEffect} from 'react'
import Pokemon from './Pokemon'

const Pokedex = () => {
  
  const [pokedex, setPokedex] = useState([]);

  const padNumber = (number, length) => {
    let str = "" + number;
    while(str.length < length){
      str = "0" + str;
    }
    return str;
  }

  const makePokedexInRange = async (start, end) => {
    let arr = [];
    for(let i = start; i <= end; i++){
      let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + i);
      let data = await response.json();
      if(response.ok && data){
        //to prevent results loading after switching gens
        let expectedGen = document.getElementById("gen-select");
        let expectedMinRange = 0;
        let expectedMaxRange = 0;
        if(expectedGen.value === "1"){
          expectedMinRange = 1;
          expectedMaxRange = 151;
        }else if(expectedGen.value === "2"){
          expectedMinRange = 152;
          expectedMaxRange = 251;
        }else if(expectedGen.value === "3"){
          expectedMinRange = 252;
          expectedMaxRange = 386;
        }else if(expectedGen.value === "4"){
          expectedMinRange = 387;
          expectedMaxRange = 493;
        }
        let latestID = expectedMinRange - 1;
        if(document.getElementsByClassName("pokemon-entry") !== null){
          let arr = Array.from(document.getElementsByClassName("pokemon-entry"));
          if(arr.length > 0){
            latestID = arr[arr.length - 1].id;
          }
        }
        if(i >= expectedMinRange && i <= expectedMaxRange && latestID == i - 1){
          setPokedex(pokedex => [...pokedex, {
            sprite: "https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/" + padNumber(i, 3) + ".png",
            name: data.name[0].toUpperCase() + data.name.substr(1, data.name.length),
            number: i,
            types: data.types,
            enabled: true
          }]);
        }
      }
    }
    return arr;
  }

  const genSet = () => {
    let element = document.getElementById("gen-select");
    if(element.value === "1"){
      setPokedex([]);
      makePokedexInRange(1, 151);
    }
    else if(element.value === "2"){
      setPokedex([]);
      makePokedexInRange(152, 251);
    }
    else if(element.value === "3"){
      setPokedex([]);
      makePokedexInRange(252, 386);
    }
    else if(element.value === "4"){
      setPokedex([]);
      makePokedexInRange(387, 493);
    }
  }

  const searchPokemon = () => {
    let searchValue = document.getElementById("pokemon-search");
    let potentialResults = document.getElementsByClassName("pokemon-name");
    let resultArray = [];
    for(let item of potentialResults){
      if(item.innerHTML.toString().toLowerCase().startsWith(searchValue.value.toLowerCase())){
        let pokemonID = item.parentElement.getElementsByClassName("pokemon-number")[0].innerHTML;
        resultArray.push(pokemonID);
      }
    }
    for(let i = 0; i < pokedex.length; i++){
      let id = document.getElementById(pokedex[i].number);
      let found = false;
      for(let item of resultArray){
        if(id.id === item.toString()){
          id.style.display = "";
          found = true;
          break;
        }
      }
      if(!found) {
        id.style.display = "none";
      }
    }
  }

  const checkSorted = () => {
    for(let i = 0; i < pokedex.length - 1; i++){
      if(pokedex[i].number > pokedex[i+1].number){
        return false;
      }
    }
    return true;
  }

  useEffect(() => {
    makePokedexInRange(1, 151);
  }, []);
  
  return(
    <div>
      <div className="pokedex-options">
        <input type="text" id="pokemon-search" name="pokemon-search" placeholder="Search" onInput={searchPokemon}></input>
        <select name="gen-select" id="gen-select" onChange={genSet}>
          <option value="1">Gen I</option>
          <option value="2">Gen II</option>
          <option value="3">Gen III</option>
          <option value="4">Gen IV</option>
        </select>
      </div>
      <div className="pokedex-container" id="pokedex-container">
        {pokedex.map((i) => <Pokemon pokemonData={i}/>)}
      </div>
    </div>
  );
}

export default Pokedex;