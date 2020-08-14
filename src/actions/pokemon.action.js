import { pokemonConstants } from '../constants/pokemon.constants'


export const pokemonActions = {
    addSearch,
  }

  function addSearch(name) {
    return { type: pokemonConstants.ADD_SEARCH, name }
  }