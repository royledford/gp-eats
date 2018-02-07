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
      eatId: '',
      goToAddNew: false,
      goToEdit: false,
    }
    this.handleAddNew = this.handleAddNew.bind(this)
  }

  handleAddNew() {
    this.setState({ goToAddNew: true })
  }

  handleCardClicked = eatId => {
    this.setState({ eatId, goToEdit: true })
  }

  render() {
    const { eats } = this.props
    const { goToAddNew, goToEdit, eatId } = this.state

    if (goToAddNew) return <Redirect to="/eats/new" />

    if (goToEdit) return <Redirect to={`/eats/${eatId}`} />

    return (
      <div className="admin--wrap">
        <div className="admin--header">
          <CardLogin onAddNew={this.handleAddNew} />
        </div>
        <div className="admin--content">
          <EatsList eats={eats} cardClicked={this.handleCardClicked} />
        </div>
      </div>
    )
  }
}
