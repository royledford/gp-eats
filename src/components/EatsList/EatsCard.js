import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Card from '../common/Card'
import { getShortAddress } from '../../helpers/helpers'
import TiBeer from 'react-icons/lib/ti/beer'
import GoLinkExternal from 'react-icons/lib/go/link-external'
import KnifeForkIcon from '../common/KnifeForkIcon'
import MarketIcon from '../common/MarketIcon'
import CarIcon from '../common/CarIcon'
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
      servesBeer: PropTypes.bool,
      delivers: PropTypes.bool,
    }),
    scrollToView: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    active: PropTypes.bool,
  }

  static defaultProps = {
    active: false,
    scrollToView: false,
  }

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.scrollToView) {
      this.currentCard.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }
  }

  handleClick(event) {
    this.props.onClick(this.props.eatsData.id)
  }

  render() {
    const { eatsData, active } = this.props
    const address = getShortAddress(eatsData.address)
    const beerIcon = eatsData.servesBeer ? <TiBeer /> : null
    const carIcon = eatsData.delivers ? <CarIcon color="white" /> : null
    const eatType =
      eatsData.category === 'restaurant' ? <KnifeForkIcon /> : <MarketIcon />
    // const activeClass = this.props.active ? 'eatscard--card-active' : ''
    return (
      <Card onClick={this.handleClick} active={active}>
        <div
          className="eatscard-wrap"
          ref={div => {
            this.currentCard = div
          }}>
          <h1 className="eatscard--name">{eatsData.name}</h1>
          <div className="eatscard--info">
            <p className="eatscard--address">{address}</p>
            {/* <p className="eatscard--hood">{eatsData.neighborhood}</p> */}
            <p className="eatscard--phone">{eatsData.phone}</p>
          </div>
          <div className="eatscard--footer">
            {beerIcon}
            {eatType}
            {carIcon}
            <a
              href={eatsData.website}
              className="eatscard--link"
              target="_blank"
              rel="noopener noreferrer">
              <GoLinkExternal />
            </a>
          </div>
        </div>
      </Card>
    )
  }
}
