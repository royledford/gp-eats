import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, Redirect } from 'react-router-dom'
import Search from '../Maps/Search'

import Dropdown from '../common/Dropdown'
import DataService from '../../services/DataService'
import Settings from '../../config/settings'
import './EatsForm.css'

export default class EatsForm extends Component {
  static propTypes = {
    onClick: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      id: '',
      name: '',
      address: '',
      website: '',
      phone: '',
      servesBeer: false,
      category: 'restaurant',
      lat: 0,
      lng: 0,
      addressError: '',
      nameError: '',
      submitLabel: 'Where to Eat?',
      backToList: false,
      addNew: true,
      formattedEatInfo: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCategoryChange = this.handleCategoryChange.bind(this)
    this.handleAddressChanged = this.handleAddressChanged.bind(this)
  }

  componentDidMount() {
    if (this.props.match.path === '/eats/:id') {
      // we are editing

      DataService.getEat(this.props.match.params.id).then(eat => {
        this.setState({
          id: eat.id,
          name: eat.name,
          address: eat.address,
          website: eat.website,
          phone: eat.phone,
          servesBeer: eat.servesBeer,
          category: eat.category,
          addNew: false,
          formattedEatInfo: this.formatEatInfo(
            eat.name,
            eat.address,
            eat.website,
            eat.phone
          ),
        })
      })

      this.setState({
        bounds: {
          east: Settings.bounds.ne.lat,
          north: Settings.bounds.ne.lng,
          south: Settings.bounds.sw.lat,
          west: Settings.bounds.sw.lng,
        },
      })
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      [e.target.name + 'Error']: '',
    })
  }

  handleCategoryChange(data) {
    this.setState({ category: data.value })
  }

  handleDelete = () => {
    DataService.deleteEat(this.state.id)
      .then(() => {
        console.log('then')
        this.setState({
          backToList: true,
        })
      })
      .catch(() => {
        console.log(`Eat: ${this.state.id} could not be deleted.`)
      })
  }

  handleAddressChanged(places) {
    if (places) {
      const info = this.formatEatInfo(
        places[0].name,
        places[0].formatted_address,
        places[0].website,
        places[0].formatted_phone_number
      )
      this.setState({
        name: places[0].name,
        address: places[0].formatted_address,
        lat: places[0].geometry.location.lat(),
        lng: places[0].geometry.location.lng(),
        website: places[0].website || '',
        phone: places[0].formatted_phone_number || '',
        formattedEatInfo: info,
      })
    } else {
      this.setState({
        name: '',
        address: '',
        lat: '',
        lng: '',
        website: '',
        phone: '',
        formattedEatInfo: 'Address not found',
      })
    }
  }

  toggleBeer = e => {
    this.setState({ servesBeer: !this.state.servesBeer })
  }

  validInput() {
    return true
  }

  formatEatInfo(name, address, website, phone) {
    const web = website ? website : ''
    const tel = phone ? phone : ''
    return `${name}\n${address}\n${web}\n${tel}
    `
  }

  handleSubmit(e) {
    e.preventDefault()
    if (this.validInput()) {
      const eat = {
        name: this.state.name,
        address: this.state.address,
        website: this.state.website,
        phone: this.state.phone,
        servesBeer: this.state.servesBeer,
        category: this.state.category,
        lat: this.state.lat,
        lng: this.state.lng,
      }
      if (this.state.addNew) {
        DataService.saveEats(eat).then(eatId => {
          this.setState({
            backToList: true,
          })
        })
      } else {
        //updte
        DataService.updateEat(this.state.id, eat).then(
          this.setState({
            backToList: true,
          })
        )
      }
    }
  }

  render() {
    const categories = [
      { value: 'restaurant', label: 'restaurant' },
      { value: 'market', label: 'market' },
    ]

    const {
      servesBeer,
      category,
      submitLabel,
      addNew,
      formattedEatInfo,
      bounds,
    } = this.state

    const enableSubmit =
      this.state.name === '' || this.state.address === '' ? false : true

    const buttonLabel = enableSubmit ? 'Yeah, add it!' : submitLabel

    if (this.state.backToList) return <Redirect to="/eats" />

    return (
      <div className="eatsform--wrap">
        <div className="eatsform--delete-control">
          {!addNew && (
            <button
              className="eatsform--button-secondary"
              onClick={this.handleDelete}>
              Delete this place
            </button>
          )}
        </div>

        <form onSubmit={this.handleSubmit} className="eatsform--form">
          <div className="eatsform--input-wrap">
            <label htmlFor="name" className="eatsform--label">
              Info
            </label>

            <textarea
              rows={6}
              name="info"
              value={formattedEatInfo}
              className="eatsform--input"
              disabled={true}
            />
          </div>

          <div className="eatsform--search-wrap">
            <label htmlFor="address" className="eatsform--label">
              Search
            </label>
            <Search
              onAddressChanged={this.handleAddressChanged}
              bounds={bounds}
            />
          </div>

          <label className="eatsform--checkbox-container">
            <span className="eatsform--checkbox-label">Serves Alcohol</span>
            <input
              type="checkbox"
              onChange={this.toggleBeer}
              checked={servesBeer}
            />
            <span className="eatsform--checkmark" />
          </label>

          <Dropdown
            value={category}
            options={categories}
            placeholder="Category"
            className="eatsform--select"
            onChange={this.handleCategoryChange}
          />

          <div className="eatsform--controls">
            <Link to="/eats" className="eatsform--button-link">
              Nope, take me back
            </Link>
            <button className="eatsform--button" disabled={!enableSubmit}>
              {buttonLabel}
            </button>
          </div>
        </form>
      </div>
    )
  }
}
