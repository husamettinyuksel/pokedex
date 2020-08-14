import { combineReducers } from 'redux'
import { general } from './general.reducer'
import { pokemon } from './pokemon.reducer'


const rootReducer = combineReducers({
  general,
  pokemon,
})

export default rootReducer
