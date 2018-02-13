import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import logo from '../img/logo.png'
import './Header.css'

export default class Header extends Component {
  render() {
    return (
      <header className="header--wrap">
        <a href="https://www.generalprovision.com/">
          <img src={logo} alt="GP Logo" className="header--logo" />
        </a>
        <Link to="/" className="header--title">
          GP Local Eats
        </Link>
        <Link to="/eats" className="header--admin-link">
          Edit
        </Link>
      </header>
    )
  }
}
