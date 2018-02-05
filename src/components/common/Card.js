import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Card.css'

export default class Card extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    active: PropTypes.bool,
  }

  defaultProps = {
    onClick: () => {},
    active: false,
  }

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event) {
    this.props.onClick()
  }

  render() {
    const activeClass = this.props.active ? 'card--card-active' : ''
    return (
      <div className={`card--card ${activeClass}`} onClick={this.handleClick}>
        {this.props.children}
      </div>
    )
  }
}
