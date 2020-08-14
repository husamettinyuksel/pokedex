import React from 'react'
import { history } from '../helpers/history'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import PokemonList from './pokemon_list'
import PokemonDetail from './pokemon_detail'
import NoMatch from './no_match'

class Home extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Redirect exact={true} from='/' to='/pokemonlist' />
          <Route exact path='/pokemonlist' component={PokemonList} />
          <Route exact path='/pokemon/:id?' component={PokemonDetail} />
          <Route path='*' component={NoMatch} />
        </Switch>
      </Router>
    )
  }
}

export default Home
