import React from 'react'
import './App.css'
import Header from './Header'
import Pokedex from './Pokedex'
import PokemonDetailsPage from './PokemonDetailsPage'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

const App = () => {
  return (
    <div className="app">
      <Header />
      <BrowserRouter>
        <Switch>
          <Route path="/pokemon/:id" children= {<PokemonDetailsPage />}/>
          <Route path="/">
            <Pokedex />  
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
