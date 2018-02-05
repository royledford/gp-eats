import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TiBeer from 'react-icons/lib/ti/beer'
import TiTrash from 'react-icons/lib/ti/trash'
import TiPencil from 'react-icons/lib/ti/pencil'
import './Row.css'

export default class Row extends Component {
  static propTypes = {
    beer: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    neighborhood: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
  }
  // static defaultProps = {
  //   someProp: 'someValue',
  // }

  constructor(props) {
    super(props)
    this.state = {
      someState: true,
    }
  }

  render() {
    const { beer, name, neighborhood, address, phone, website } = this.props
    const beerIcon = beer ? <TiBeer /> : <TiBeer />
    return (
      <tr className="table--row">
        <td className="table--cell table--cell-icon">{beerIcon}</td>
        <td className="table--cell">{name}</td>
        <td className="table--cell">{neighborhood}</td>
        <td className="table--cell">{address}</td>
        <td className="table--cell">{phone}</td>
        <td className="table--cell">
          <a href={website}>{website}</a>
        </td>
        <td className="table--cell table--cell-icon-secondary">
          <TiTrash />
        </td>
        <td className="table--cell table--cell-icon">
          <TiPencil />
        </td>
      </tr>
    )
  }
}
