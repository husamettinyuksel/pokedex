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
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import BackIcon from '@material-ui/icons/ArrowBack';

const styles = (theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        paddingBottom: theme.spacing(2)
      },
     container:{
       paddingTop: theme.spacing(3),
       paddingBottom: theme.spacing(3)
     },
     row:{
        padding:theme.spacing(),
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#fff'
     },
     details:{
         padding:theme.spacing(),
         marginTop:theme.spacing(2)
     },
     lists:{
        marginTop:theme.spacing(2)
     },
     list:{
        width: '100%',
        backgroundColor: theme.palette.background.paper,
     },
     moves: {
        padding:theme.spacing(),
         marginTop:theme.spacing(2),
         backgroundColor:'#fff'
      },
      chip: {
        margin: theme.spacing(0.5),
      },
      back:{
        margin: theme.spacing(),
      }
})


export class PokemonList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      pokemon: null,

    }
  }

  componentWillMount(){
    if(this.props.idProp){
        pokemonService.getPokemonWithId(this.props.idProp).then((res) => {
            if (res.status === generalConstants.STATUS_OK){
                this.setState({pokemon: res.data})
                 console.log(res.data)
            }
        })
    }
  }

  handleBackClick = () => {
    this.props.history.push(`/pokemonlist`)
  }

  render() {
    const { classes} = this.props
    const {pokemon} = this.state;

    var settings = {
        draggable: true,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      }

    return (
      <div className='full-width'>
          <TopNavBar/>
         <Container maxWidth='md' className={classes.container} >
         <IconButton edge="start" className={classes.back} color="inherit" aria-label="menu" 
         onClick={this.handleBackClick.bind(this)}
         >
            <BackIcon />
            </IconButton>
            <Card className={classes.root} variant="outlined">
           {pokemon && <CardContent className='full-width'>
                    <Typography variant="h3" component="h2" style={{textTransform: 'capitalize' ,textAlign:'center'}} gutterBottom>
                        {pokemon.name}
                    </Typography>
                    <Grid container spacing={2} className='full-width'>
                        <Grid item xs={12} className='flex-col'>
                            <Slider {...settings} style={{width: 200}}>
                                {pokemon.sprites &&
                                    Object.entries(pokemon.sprites).map((item) => (
                                        item[1] != null && <img src={`${item[1]}`} key={item[0]} alt=''/>
                                    ))
                                }
                            </Slider>
                        </Grid>
                    </Grid>
                </CardContent>}
            </Card>
            {pokemon && <Grid container spacing={2} className={classes.details}>
                <Grid item xs={12} sm={4} className={classes.row}>
                    <Typography variant="h6">
                        {`Order: `}
                    </Typography>
                    <Typography variant="h6">
                        {pokemon.order}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={4} className={classes.row}>
                    <Typography variant="h6" >
                        {`Weight: `}
                    </Typography>
                    <Typography variant="h6">
                        {pokemon.weight}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={4} className={classes.row}>
                    <Typography variant="h6">
                        {`Height: `}
                    </Typography>
                    <Typography variant="h6">
                        {pokemon.height}
                    </Typography>
                </Grid>
            </Grid>}
            {pokemon &&
                <Grid container spacing={2} className={classes.lists}>
                    <Grid item xs={12} sm={4} className='flex-col'>
                        <List className={classes.list}
                            subheader={
                                <ListSubheader component="div" id="nested-list-subheader">
                                    Abilities
                                </ListSubheader>
                            }>
                            {pokemon.abilities && pokemon.abilities.map((item, index) => (
                                <ListItem button key={index}>
                                    <ListItemText primary={item.ability.name}/>
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                    <Grid item xs={12} sm={4} className='flex-col'>
                        <List className={classes.list}
                            subheader={
                                <ListSubheader component="div" id="nested-list-subheader">
                                    Forms
                                </ListSubheader>
                            }>
                            {pokemon.forms && pokemon.forms.map((item, index) => (
                                <ListItem button key={index}>
                                    <ListItemText primary={item.name}/>
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                    <Grid item xs={12} sm={4} className='flex-col'>
                        <List className={classes.list}
                            subheader={
                                <ListSubheader component="div" id="nested-list-subheader">
                                    Types
                                </ListSubheader>
                            }>
                            {pokemon.types && pokemon.types.map((item, index) => (
                                <ListItem button key={index}>
                                    <ListItemText primary={item.type.name}/>
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                </Grid>
            }
            {pokemon &&
                <div className={classes.moves}>
                    <Typography gutterBottom variant="body1">
                    Moves
                    </Typography>
                    <div>
                    {pokemon.moves && pokemon.moves.map((item, index) => (
                               <Chip key={item.move.name} className={classes.chip} color="primary" label={item.move.name} />
                            ))}
                    </div>
              </div>

            }
          </Container>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
      idProp: ownProps.match.params.id,
    }
  }

export default withStyles(styles)(injectIntl(withRouter(connect(mapStateToProps, null)(PokemonList))))
