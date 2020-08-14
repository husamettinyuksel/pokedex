import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { injectIntl } from 'react-intl'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'

const styles = (theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
})

class NoMatch extends React.Component {
  render() {
    return (
      <div>
        <p style={{ textAlign: 'center' }}>
          <Link to='/'>Go to Home </Link>
        </p>
      </div>
    )
  }
}

export default withStyles(styles)(withRouter(injectIntl(NoMatch)))
