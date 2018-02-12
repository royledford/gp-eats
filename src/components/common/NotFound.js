import React, { Component } from 'react'
// import LogoAnimated from './LogoAnimated'
import './NotFound.css'

export default class NotFound extends Component {
  render() {
    return (
      <div className="notfound--wrap">
        <h1 className="notfound--title">404 - Page not found.</h1>
        <h2 className="notfound--title-small">
          * Our designers are awesome but even they can't design a page for
          everything you can type :)
        </h2>
      </div>
    )
  }
}
