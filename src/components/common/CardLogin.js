import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { auth } from '../../config/firebase'
import Card from './Card'
import TiPlus from 'react-icons/lib/ti/plus'
import { login, logout } from '../../services/AuthService'

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
    this.loginUser = this.loginUser.bind(this)
    this.logoutUser = this.logoutUser.bind(this)
  }

  componentDidMount() {
    // auth.onAuthStateChanged(user => {
    //   if (user) {
    //     this.setState({ user })
    //   }
    // })
  }

  logoutUser() {
    logout()
      .then(() => {
        this.setState({
          user: null,
        })
      })
      .catch(e => console.log('Login:', e))
  }

  loginUser() {
    login()
      .then(user => {
        this.setState({
          user,
        })
      })
      .catch(e => console.log('Login:', e))
  }

  render() {
    const { onAddNew } = this.props

    // Login button
    // const login = this.state.user ? (
    //   <button onClick={this.logoutUser} className="cardlogin--button">
    //     Log out
    //   </button>
    // ) : (
    //   <button onClick={this.loginUser} className="cardlogin--button">
    //     Log in
    //   </button>
    // )

    // Add button
    const addButton = this.state.user ? (
      <div className="cardlogin--add">
        <TiPlus className="cardlogin--add-icon" onClick={onAddNew} />
      </div>
    ) : null

    // UserAvatar
    // const avatar = this.state.user ? (
    //   <div className="cardlogin--profile">
    //     <img src={this.state.user.photoURL} alt="User profile" />
    //   </div>
    // ) : null

    return (
      <Card>
        <div className="cardlogin--wrap">
          {/* {avatar} */}
          {/* {addButton} */}
          <div className="cardlogin--add">
            <TiPlus className="cardlogin--add-icon" onClick={onAddNew} />
          </div>
          {/* {login} */}
        </div>
      </Card>
    )
  }
}
