import React, { Component } from 'react'
import logo from '../img/logo.png'
import TiPlus from 'react-icons/lib/ti/plus'
import './Header.css'

export default class Header extends Component {
  render() {
    return (
      <header className="header--wrap">
        <img src={logo} alt="GP Logo" className="header--logo" />
        <h1 className="header--title">GP Local Eats</h1>
        <div className="header--add">
          <TiPlus className="header--add-icon" />
        </div>
      </header>
    )
  }
}
