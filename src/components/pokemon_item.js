/* eslint-disable react/prop-types */
import React from 'react'
import { withStyles  } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { injectIntl } from 'react-intl'
import { pokemonService } from '../services/pokemon.service'
import {generalConstants} from '../constants/general.constants'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = () => ({
 
  })

class PokemonItem extends React.Component{
    constructor(props) {
      super(props)
  
      this.state = {
        item: null
      }
    }
  
    componentWillMount(){
      const {pokemon} = this.props;
      console.log(pokemon.url)
      pokemonService.getPokemonWithUrl(pokemon.url).then((res) => {
        if (res.status === generalConstants.STATUS_OK){
          this.setState({item: res.data})
        }
      })
    }
  
    handleClick = () => {
      this.props.history.push(`/pokemon/${this.state.item.id}`)
    }
  
    render(){
      const {pokemon} = this.props;
      const {item } = this.state;
  
      return (
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card className='list-item'>
          <CardContent className='flex-col'>
            <Typography variant="h5" component="h2" style={{textTransform: 'capitalize'}}>
              {pokemon.name}
            </Typography>
            <div className='flex-col grow'>
              {item && item.sprites && item.sprites.front_default && <img src={`${item.sprites.front_default}`} alt='' />}
            </div>
          </CardContent>
          <CardActions>
            <Button fullWidth size="small" onClick={this.handleClick.bind(this)}>Learn More</Button>
          </CardActions>
        </Card>
      </Grid>
      );
    }
  }
  
  export default withStyles(styles)(injectIntl(withRouter(PokemonItem)))
