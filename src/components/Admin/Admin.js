import React, { Component } from 'react'
import PropTypes from 'prop-types'

import CardLogin from '../common/CardLogin'
import EatsList from '../EatsList/EatsList'
import './Admin.css'

export default class Admin extends Component {
  static propTypes = {
    eats: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      someState: true,
    }
  }

  render() {
    const { eats } = this.props

    return (
      <div className="admin--wrap">
        <div className="admin--header">
          <CardLogin />
        </div>
        <div className="admin--content">
          <EatsList eats={eats} />
        </div>
      </div>
    )
  }
}
