// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'

import { ErrorBoundary } from 'react-error-boundary';
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {fetchPokemon, PokemonDataView, PokemonForm, PokemonInfoFallback} from '../pokemon'


// class ErrorBoundary extends React.Component{
//   constructor(props){
//     super(props);
//     this.state = {hasError: false};
//   }
//   static getDerivedStateFromError(error){
//     return {hasError: true};
//   }

//   render() {
//     if(this.state.hasError){
//       return this.props.FallBackComponent({error: "There is some problem"});
//     }
//     return this.props.children;
//   }
// }

function PokemonInfo({pokemonName}) {
  // 🐨 Have state for the pokemon (null)
  // const [pokemon, setPokemon] = React.useState(null);
  // const [status, setStatus] = React.useState('idle');
  const [state, setState] = React.useState({pokemon: null, status: 'idle'});
  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.
  React.useEffect(() => {
    // setPokemon(null);
    // setStatus('pending');
    if(!pokemonName){
      return ;
    }
    setState({pokemon: null, status: 'pending'});
    if(pokemonName){
      fetchPokemon(pokemonName).then(pokemonData => {
        // setPokemon(pokemonData);
        // setStatus('resolved');
        setState({pokemon: pokemonData, status: 'resolved'});
      }).catch(()=>{
        // setPokemon(null);
        // setStatus('rejected');
        setState({pokemon:null, status: 'rejected'})
      });
    }
  },[pokemonName])
  // 💰 DON'T FORGET THE DEPENDENCIES ARRAY!
  // 💰 if the pokemonName is falsy (an empty string) then don't bother making the request (exit early).
  // 🐨 before calling `fetchPokemon`, clear the current pokemon state by setting it to null.
  // (This is to enable the loading state when switching between different pokemon.)
  // 💰 Use the `fetchPokemon` function to fetch a pokemon by its name:
  //   fetchPokemon('Pikachu').then(
  //     pokemonData => {/* update all the state here */},
  //   )
  // 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
  //   1. no pokemonName: 'Submit a pokemon'
  //   2. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
  //   3. pokemon: <PokemonDataView pokemon={pokemon} />

  // 💣 remove this
    if(state.status === 'rejected'){
      // return <div role="alert">
      //   There was an error:{' '}
      //   <pre style={{whiteSpace: 'normal'}}>{"There is error"}</pre>
      // </div>
      throw new Error("Rejected Promise");
    }
    else if(state.status === 'resolved' ){
      return <PokemonDataView pokemon={state.pokemon} />
    }
    else if(state.status ==='pending'){
      return  <PokemonInfoFallback name = {pokemonName}/>
    }
    else{
      return 'Submit a pokemon'
    }
  // return 'TODO'
}

function ErrorFallback({error}) {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
    </div>
  )
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (

      <div className="pokemon-info-app">
        <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
        <hr />
        <div className="pokemon-info">
        <ErrorBoundary key={pokemonName} FallBackComponent = {ErrorFallback}>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
        </div>
      </div>
  )
}

export default App
