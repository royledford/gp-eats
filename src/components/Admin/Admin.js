import React, { Component } from 'react'
import PropTypes from 'prop-types'

import AdminMapContainer from '../Maps/AdminMapContainer'

import './Admin.css'

export default class Admin extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    someProp: PropTypes.string,
  }
  static defaultProps = {
    someProp: 'someValue',
  }

  constructor(props) {
    super(props)
    this.state = {
      someState: true,
    }
  }

  render() {
    return (
      <div className="admin--content">
        <AdminMapContainer />
      </div>
    )
  }
}
