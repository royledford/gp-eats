import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import MainContainer from './components/MainContainer'
import AdminContainer from './components/Admin/AdminContainer'
import './App.css'

class App extends Component {
  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path="/" component={MainContainer} />
          <Route path="/admin" component={AdminContainer} />
        </Switch>
      </Router>
    )
  }
}

export default App
