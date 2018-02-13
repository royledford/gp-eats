import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import PrivateRoute from './PrivateRoute'
import MainContainer from './components/MainContainer'
import AdminContainer from './components/Admin/AdminContainer'
import EatsForm from './components/Eats/EatsForm'
import Header from './components/Header'
import NotFound from './components/common/NotFound'
import './App.css'

import LogoAnimated from './components/common/LogoAnimated'

class App extends Component {
  componentDidMount() {
    console.log('url: ', process.env.PUBLIC_URL)
  }

  render() {
    return (
      <React.Fragment>
        <Router basename={process.env.PUBLIC_URL}>
          <React.Fragment>
            <Header />
            <Switch>
              <Route exact path="/" component={MainContainer} />
              <Route exact path="/eats" component={AdminContainer} />
              <PrivateRoute exact path="/eats/new" component={EatsForm} />
              <PrivateRoute exact path="/eats/:id" component={EatsForm} />
              <Route component={NotFound} />
            </Switch>
            <LogoAnimated containerClass="app--loader" />
          </React.Fragment>
        </Router>
      </React.Fragment>
    )
  }
}

export default App
