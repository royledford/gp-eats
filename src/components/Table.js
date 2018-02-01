import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Row from './Row'
import './Table.css'

export default class Table extends Component {
  static propTypes = {
    eats: PropTypes.array.isRequired,
  }

  render() {
    const { eats } = this.props
    let eatsRows = null
    if (eats.length > 0) {
      eatsRows = eats.map(eat => {
        return (
          <Row
            key={eat.id}
            beer={eat.servesBeer}
            name={eat.name}
            neighborhood={eat.neighborhood}
            address={eat.address}
            phone={eat.phone}
            website={eat.website}
          />
        )
      })
    }

    return (
      <table className="table">
        <thead>
          <tr className="table--header">
            <td className="table--header">{''}</td>
            <td className="table--header">Name</td>
            <td className="table--header">Neighborhood</td>
            <td className="table--header">Address</td>
            <td className="table--header">Phone</td>
            <td className="table--header">Website</td>
          </tr>
        </thead>
        <tbody>{eatsRows}</tbody>
      </table>
    )
  }
}
