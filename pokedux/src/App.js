import {Col} from 'antd';
import Searcher from './components/Searcher';
import {  connect } from 'react-redux';
import './App.css';
import { setPokemons as setPokemonsActions } from './actions';
import PokemonList from './components/PokemonList';
import logo from './statics/logo.svg';
import { useEffect, useState } from 'react';
import { getPokemon } from './api';

function App({pokemons, setPokemons}) {

  useEffect(() => {
    const fetchPokemons = async () => {
      const pokemonRes = await getPokemon();
      setPokemons(pokemonRes);
    }
    fetchPokemons();
  },[]);

  return (
    <div className="App">
      <Col span={4} offset={10}>
        <img src={logo} alt='Pokedux'/>
      </Col>
       <Col span={8} offset={8}>
          <Searcher/>
       </Col>
       <PokemonList
        pokemons={pokemons}
       />
    </div>
  );
}

const mapStateToProps = (state) => ({
  pokemons: state.pokemons,
});
const mapDispatchToProps = (dispatch) =>({
  setPokemons: (value) => dispatch(setPokemonsActions(value))
});

export default connect(mapStateToProps,mapDispatchToProps) (App);
