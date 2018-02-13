import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class CarIcon extends Component {
  render() {
    return (
      <svg width="20px" height="20px" viewBox="0 0 87.7 49">
        <title>Car Icon</title>
        <g fill={this.props.color}>
          <circle cx="20.2" cy="40" r="9" />
          <circle cx="70.2" cy="40" r="9" />
          <path
            d="M71,21.17,64.8,8.87a13.89,13.89,0,0,0-12.4-7.7H29.85A13.89,13.89,0,0,0,17.36,8.92l-2.14,4.25H40V2.87l18.13,15.8L40,34.47V24.17H4.34A10.42,10.42,0,0,0,1,31.82v1.35a8,8,0,0,0,8,8,12,12,0,0,1,24,0H59a12,12,0,0,1,24,0c4.8,0,5.7-4.6,5.7-9.4C88.6,21.77,78.6,21.17,71,21.17Z"
            transform="translate(-1 -1.17)"
          />
        </g>
      </svg>
    )
  }
}
