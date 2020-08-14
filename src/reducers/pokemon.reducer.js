import {pokemonConstants}  from '../constants/pokemon.constants'

const initialState = {
  recentSearch:[]
}

export function pokemon(state = initialState, action) {
  switch (action.type) {
    case pokemonConstants.ADD_SEARCH:
      if(state.recentSearch.some((rs) => rs === action.name)){
        return state
      }else{
        return  {
          ...state,
          recentSearch: [...state.recentSearch, action.name],
        }    
      }
    default:
      return state
  }
}
