import React from 'react'
import Pokemon from './Pokemon'

const Pokedex = () => {
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
    
      var pokedex = makePokedexInRange(100, 150);

      return(
        <div>
          <div className="pokedex-options">
            <input type="text" id="pokemon-search" name="pokemon-search" placeholder="Search"></input>
            <select name="gen-select" id="gen-select">
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