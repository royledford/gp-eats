import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import MainContainer from './components/MainContainer'
import AdminContainer from './components/Admin/AdminContainer'
import EatsForm from './components/Eats/EatsForm'
import Header from './components/Header'
import './App.css'

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Router basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route exact path="/" component={MainContainer} />
            <Route exact path="/eats" component={AdminContainer} />
            <Route exact path="/eats/new" component={EatsForm} />
          </Switch>
        </Router>
      </React.Fragment>
    )
  }
}

export default App
