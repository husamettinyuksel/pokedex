import React from 'react'
import { IntlProvider } from 'react-intl'
import messages from './helpers/messages'
import Home from './components/home'
import CssBaseline from '@material-ui/core/CssBaseline'


class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      lang: 'en',
    }
  }


  render() {
    const { lang } = this.state

    return (
      <div>
        <CssBaseline />

        <IntlProvider locale={lang} messages={messages[lang]}>
          <Home />
        </IntlProvider>
        </div>
        )
  }
}

export default App
