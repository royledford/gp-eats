import React, { Component } from 'react'
import PropTypes from 'prop-types'
import EatsCard from './EatsCard'
import './EatsList.css'

export default class EatsList extends Component {
  static propTypes = {
    eats: PropTypes.array.isRequired,
    cardClicked: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      activeCard: '',
    }
  }

  handleCardClick = id => {
    this.setState({ activeCard: id })
  }

  render() {
    const { eats, cardClicked } = this.props
    const { activeCard } = this.state

    let eatsCards = null
    if (eats.length > 0) {
      eatsCards = eats.map(eat => {
        const active = activeCard === eat.id
        return <EatsCard key={eat.id} eatsData={eat} onClick={this.handleCardClick} active={active} />
      })
    }

    return <div className="eatslist">{eatsCards}</div>
  }
}
