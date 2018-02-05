import React, { Component } from 'react'
import PropTypes from 'prop-types'
import EatsCard from './EatsCard'
import './EatsList.css'

export default class EatsList extends Component {
  static propTypes = {
    eats: PropTypes.array.isRequired,
  }

  render() {
    const { eats } = this.props

    let eatsCards = null
    if (eats.length > 0) {
      eatsCards = eats.map(eat => {
        return <EatsCard key={eat.id} eatsData={eat} />
      })
    }

    return <div className="eatslist">{eatsCards}</div>
  }
}
