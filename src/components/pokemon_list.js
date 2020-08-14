/* eslint-disable react/prop-types */
import React from 'react'
import { withStyles  } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { injectIntl } from 'react-intl'
import TopNavBar from './top_navbar'
import { pokemonService } from '../services/pokemon.service'
import {generalConstants} from '../constants/general.constants'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import PokemonItem from './pokemon_item'

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    minHeight: '100vh',
  },
 container:{
   paddingTop: theme.spacing(3),
   paddingBottom: theme.spacing(3)
 }
})


export class PokemonList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      pokemonList: [],
      loading: false,
      fetched: false
    }
  }

  componentWillMount(){
    this.setState({
      loading : true
    });
    pokemonService.getAll().then((res) => {
      if (res.status === generalConstants.STATUS_OK){
        this.setState({pokemonList: res.data.results, loading: false, fetched : true})
      }
    })
  }

  render() {
    const { classes} = this.props
    const {fetched, loading, pokemonList} = this.state;

    let content ;
    if(fetched){
      content =<Grid container className='full-width' spacing={2}>
        {pokemonList.map((pokemon,index)=><PokemonItem key={pokemon.name} id={index+1} pokemon={pokemon}/>)}
        </Grid>;
    }else if(loading && !fetched){
        content = <p> Loading ...</p>;
    }
    else{
      content = <div/>;
    }

    return (
      <div className='full-width'>
          <TopNavBar/>
          <Container maxWidth='lg' className={classes.container} >
              {content}
          </Container>
      </div>
    )
  }
}


export default withStyles(styles)(injectIntl(withRouter(PokemonList)))
