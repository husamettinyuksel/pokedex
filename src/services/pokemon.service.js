import axios from 'axios'
import { uiHeader } from '../helpers/config'


const API_URL = process.env.REACT_APP_API_URL

export const pokemonService = {
    getAll,
    getPokemonWithUrl,
    getPokemonWithId,
    search
}

function getAll() {
    return axios.get(`${API_URL}/pokemon?limit=100`, uiHeader())
    .then(response=>{
        return response;
      });
  }

  function getPokemonWithUrl(url) {
    return axios.get(url, uiHeader()).then(response=>{
        return response;
      });
  }

  function getPokemonWithId(id) {
    return axios.get(`${API_URL}/pokemon/${id}`, uiHeader()).then(response=>{
        return response;
      });
  }

  
  function search(pokemon) {
    return axios.get(`${API_URL}/pokemon/${pokemon}`, uiHeader()).then(response=>{
        return response;
      });
  }