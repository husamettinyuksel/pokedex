import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { withStyles, fade  } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import SearchIcon from '@material-ui/icons/Search';
import OkIcon from '@material-ui/icons/ArrowForward';
import InputAdornment from '@material-ui/core/InputAdornment'
import { pokemonService } from '../services/pokemon.service'
import { pokemonActions } from '../actions/pokemon.action'
import {generalConstants} from '../constants/general.constants'
import Popper from '@material-ui/core/Popper';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  popper: {
    padding: theme.spacing(2),
    backgroundColor:'#fff',
    width:200,
    borederRadius:16
  },
});

export class TopNavBar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      search: '',
      anchorEl: null
    }
  }

  handleSearch = () => {
     pokemonService.search(this.state.search).then((res) => {
      if (res.status === generalConstants.STATUS_OK){
        this.props.addSearch(this.state.search)
       this.props.history.push(`/pokemon/${res.data.id}`)
      }
    })
  }

  handleRecentClose = () => {
    this.setState({anchorEl: null})
  };

  render() {
    const { classes, recentSearches} = this.props
    const {search, anchorEl} = this.state;
    const open = Boolean(anchorEl);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
          Pokédex
          </Typography>
          <div className={classes.search}>
            <TextField
              placeholder="Search…"
              value={search}
              onFocus={event=> this.setState({anchorEl: event.target})}
              onBlur={event=> this.setState({anchorEl:null})}
              onChange={evnt => this.setState({search: evnt.target.value})}
              InputProps={{
                startAdornment:(
                  <InputAdornment position='start'>
                     <SearchIcon style={{color:'#d4d4d'}}/>
                </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      color='inherit'
                      size='small'
                      disabled={!search}
                      onClick={this.handleSearch.bind(this)}
                    >
                     <OkIcon/>
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </Toolbar>
      </AppBar>
      <Popper 
       open={open && recentSearches.length > 0}
        anchorEl={anchorEl}
        onClose={this.handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        className={classes.popper}
      >
         {recentSearches.map((item, index) => (
            <Typography className={classes.typography}>{item}</Typography>
        ))}
      </Popper >
    </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { pokemon } = state
    return {
      recentSearches: pokemon.recentSearch,
      idProp: ownProps.match.params.id,
    }
  }

  const actionCreators = {
    addSearch: pokemonActions.addSearch
  }

export default withStyles(styles)(injectIntl(withRouter(connect(mapStateToProps, actionCreators)(TopNavBar))))
