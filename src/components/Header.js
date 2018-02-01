import React, { Component } from 'react'
import PropTypes from 'prop-types'
import logo from '../img/logo.png'
import './Header.css'

export default class Header extends Component {
  render() {
    return (
      <header className="header--wrap">
        <img src={logo} alt="GP Logo" className="header--logo" />
        <h1 className="header--title">GP Local Eats</h1>
      </header>
    )
  }
}
