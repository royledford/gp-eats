import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import { auth } from '../../config/firebase'

import CardLogin from '../common/CardLogin'
import EatsList from '../EatsList/EatsList'
import './Admin.css'

export default class Admin extends Component {
  static propTypes = {
    eats: PropTypes.array.isRequired,
    editEat: PropTypes.func.isRequired,
    addNewEat: PropTypes.func.isRequired,
    eatId: PropTypes.string,
  }
  static defaultProps = {
    user: null,
    eatId: '',
  }

  render() {
    const { eats, editEat, addNewEat } = this.props

    return (
      <div className="admin--wrap">
        <div className="admin--header">
          <CardLogin onAddNew={addNewEat} />
        </div>
        <div className="admin--content">
          <EatsList eats={eats} cardClicked={editEat} />
        </div>
      </div>
    )
  }
}
