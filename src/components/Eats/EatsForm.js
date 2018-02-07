import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, Redirect } from 'react-router-dom'
import Dropdown from '../common/Dropdown'
import firebase from '../../config/firebase'
import Geocode from '../../services/Geocode'
import DataService from '../../services/DataService'
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
      checkingAddress: true,
      addNew: true,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCategoryChange = this.handleCategoryChange.bind(this)
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
          checkingAddress: false,
        })
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

  handleAddressFocus = e => {
    this.setState({ checkingAddress: true })
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

  toggleBeer = e => {
    this.setState({ servesBeer: !this.state.servesBeer })
  }

  validInput() {
    let status = true
    if (this.state.name === '') {
      this.setState({ nameError: 'Please add a name :)' })
      status = false
    }
    if (this.state.address === '') {
      this.setState({ addressError: 'Please add an address :)' })
      status = false
    }

    return status
  }

  getLatLng = () => {
    const prevLabel = this.state.submitLabel
    this.setState({ checkingAddress: true, submitLabel: 'Searching...' })
    var address = this.state.address

    Geocode.getGeocodeFromAddress(address)
      .then(location => {
        this.setState({
          lat: location.results[0].geometry.location.lat,
          lng: location.results[0].geometry.location.lng,
          address: location.results[0].formatted_address,
          addressError: '',
          checkingAddress: false,
          submitLabel: prevLabel,
        })
      })
      .catch(error => {
        console.log(error)
        this.setState({
          // just set something so we don't crash
          lat: 0,
          lng: 0,
          addressError: 'Address not found',
          checkingAddress: false,
          submitLabel: prevLabel,
        })
      })
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
      name,
      address,
      website,
      phone,
      servesBeer,
      category,
      addressError,
      nameError,
      checkingAddress,
      submitLabel,
      addNew,
    } = this.state

    const enableSubmit =
      this.state.name === '' || this.state.address === ''
        ? false
        : checkingAddress ? false : true

    const buttonLabel = enableSubmit ? 'Yeah, add it!' : submitLabel

    if (this.state.backToList) return <Redirect to="/eats" />

    return (
      <div className="eatsform--wrap">
        <form onSubmit={this.handleSubmit} className="eatsform--form">
          <div className="eatsform--controls">
            <Link to="/eats" className="eatsform--button-link">
              Nope, take me back
            </Link>
            <button className="eatsform--button" disabled={!enableSubmit}>
              {buttonLabel}
            </button>
          </div>

          <div className="eatsform--input-wrap">
            <label htmlFor="name" className="eatsform--label">
              Name
            </label>
            {nameError && (
              <span className="eatsform--input--error">{nameError}</span>
            )}
            <input
              type="text"
              name="name"
              value={name}
              className="eatsform--input"
              onChange={this.handleChange}
            />
          </div>

          <div className="eatsform--input-wrap">
            <label htmlFor="address" className="eatsform--label">
              Address
            </label>
            {addressError && (
              <span className="eatsform--input--error">{addressError}</span>
            )}
            <input
              type="text"
              name="address"
              value={address}
              className="eatsform--input"
              onChange={this.handleChange}
              onBlur={this.getLatLng}
              onFocus={this.handleAddressFocus}
            />
          </div>

          <div className="eatsform--input-wrap">
            <label htmlFor="website" className="eatsform--label">
              Website
            </label>
            <input
              type="text"
              name="website"
              value={website}
              className="eatsform--input"
              onChange={this.handleChange}
            />
          </div>

          <div className="eatsform--input-wrap">
            <label htmlFor="phone" className="eatsform--label">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={phone}
              className="eatsform--input"
              onChange={this.handleChange}
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

          {!addNew && (
            <div className="eatsform--footer-controls">
              <button
                className="eatsform--button-secondary"
                onClick={this.handleDelete}>
                Delete this place
              </button>
            </div>
          )}
        </form>
      </div>
    )
  }
}
