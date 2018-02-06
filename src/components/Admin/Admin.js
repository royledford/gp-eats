import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

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
      goToAddNew: false,
    }
    this.handleAddNew = this.handleAddNew.bind(this)
  }

  handleAddNew() {
    this.setState({ goToAddNew: true })
  }

  render() {
    const { eats } = this.props
    const { goToAddNew } = this.state

    if (goToAddNew) return <Redirect to="/eats/new" />

    return (
      <div className="admin--wrap">
        <div className="admin--header">
          <CardLogin onAddNew={this.handleAddNew} />
        </div>
        <div className="admin--content">
          <EatsList eats={eats} />
        </div>
      </div>
    )
  }
}
