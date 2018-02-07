import React, { Component } from 'react'
import PropTypes from 'prop-types'
import firebase, { auth, provider } from '../../config/firebase'
import Card from './Card'
import TiPlus from 'react-icons/lib/ti/plus'
import { isUserAdmin } from '../../services/UserService'

import './CardLogin.css'

export default class CardLogin extends Component {
  static propTypes = {
    onAddNew: PropTypes.func.isRequired,
  }
  static defaultProps = {
    onAddNew: () => {},
  }

  constructor(props) {
    super(props)
    this.state = {
      user: null,
    }
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ user })
      }
    })
  }

  authCb() {}

  logout() {
    auth.signOut().then(() => {
      this.setState({
        user: null,
      })
    })
  }

  login() {
    auth.signInWithPopup(provider).then(result => {
      const user = result.user
      this.setState({
        user,
      })
    })
  }

  render() {
    const { onAddNew } = this.props

    // Login button
    const login = this.state.user ? (
      <button onClick={this.logout} className="cardlogin--button">
        Log out
      </button>
    ) : (
      <button onClick={this.login} className="cardlogin--button">
        Log in
      </button>
    )

    // Add button
    const addButton = this.state.user ? (
      <div className="cardlogin--add">
        <TiPlus className="cardlogin--add-icon" onClick={onAddNew} />
      </div>
    ) : null

    // UserAvatar
    const avatar = this.state.user ? (
      <div className="cardlogin--profile">
        <img src={this.state.user.photoURL} />
      </div>
    ) : null

    return (
      <Card>
        <div className="cardlogin--wrap">
          {avatar}
          {addButton}
          {login}
        </div>
      </Card>
    )
  }
}
