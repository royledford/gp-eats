import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Card from '../common/Card'
import { getShortAddress } from '../../helpers/helpers'
import TiBeer from 'react-icons/lib/ti/beer'
import GoLinkExternal from 'react-icons/lib/go/link-external'
import KnifeForkIcon from '../common/KnifeForkIcon'
import MarketIcon from '../common/MarketIcon'
import './EatsCard.css'

export default class EatsCard extends Component {
  static propTypes = {
    eatsData: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
      beer: PropTypes.bool,
      neighborhood: PropTypes.string,
      address: PropTypes.string,
      phone: PropTypes.string,
      website: PropTypes.string,
    }),
    onClick: PropTypes.func.isRequired,
    active: PropTypes.bool,
  }

  defaultProps = {
    active: false,
  }

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event) {
    this.props.onClick(this.props.eatsData.id)
  }

  render() {
    const { eatsData, active } = this.props
    const beerIcon = eatsData.servesBeer ? <TiBeer /> : null
    const address = getShortAddress(eatsData.address)
    const eatType = eatsData.category === 'restaurant' ? <KnifeForkIcon /> : <MarketIcon />
    // const activeClass = this.props.active ? 'eatscard--card-active' : ''
    return (
      <Card onClick={this.handleClick} active={active}>
        <h1 className="eatscard--name">{eatsData.name}</h1>
        <div className="eatscard--info">
          <p className="eatscard--address">{address}</p>
          {/* <p className="eatscard--hood">{eatsData.neighborhood}</p> */}
          <p className="eatscard--phone">{eatsData.phone}</p>
        </div>
        <div className="eatscard--footer">
          {beerIcon}
          {eatType}
          <a href={eatsData.website} className="eatscard--link" target="_blank" rel="noopener noreferrer">
            <GoLinkExternal />
          </a>
        </div>
      </Card>
    )
  }
}
