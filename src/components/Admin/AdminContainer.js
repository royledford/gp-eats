import React, { Component } from 'react'
import { auth } from '../../config/firebase'
import { Redirect } from 'react-router-dom'
import { ToastContainer, toast, style } from 'react-toastify'
import { isLoggedIn } from '../../services/AuthService'

import Header from '../Header'
import Admin from './Admin'
import DataService from '../../services/DataService'

export default class AdminContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      eats: [],
      user: null,
      eatId: '',
      editEat: false,
      addNewEat: false,
    }
    this.handleCardClicked = this.handleCardClicked.bind(this)
    this.handleAddNew = this.handleAddNew.bind(this)
  }

  componentDidMount() {
    DataService.getEats().then(eats => {
      const sortedEats = eats.sort((a, b) => {
        if (a.name > b.name) {
          return 1
        } else {
          return -1
        }
      })
      this.setState({ eats: sortedEats })
    })

    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ user })
      }
    })

    // overide the toast styles
    style({
      colorInfo: 'rgb(80, 119, 93)',
    })
  }

  handleCardClicked = eatId => {
    if (isLoggedIn()) {
      this.setState({ eatId, editEat: true })
    } else {
      toast.info('Please login to edit locations.')
    }
  }

  handleAddNew() {
    this.setState({ addNewEat: true })
  }

  render() {
    const { eats, eatId, editEat, addNewEat } = this.state

    if (editEat) return <Redirect to={`/eats/${eatId}`} />

    if (addNewEat) return <Redirect to="/eats/new" />

    return (
      <div>
        <Header />
        <Admin
          eats={eats}
          eatId={eatId}
          addNewEat={this.handleAddNew}
          editEat={this.handleCardClicked}
        />
        <ToastContainer position={'top-center'} autoClose={2000} />
      </div>
    )
  }
}
