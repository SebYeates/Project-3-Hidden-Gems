import React from 'react'
import axios from 'axios'

import Auth from '../../lib/Auth'

import TripsForm from './TripsForm'

class TripsNew extends React.Component {
  constructor() {
    super()

    this.state = {
      data: {

      },
      error: null
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleMultiChange = this.handleMultiChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange({ target: { name, value } }) {
    const data = {...this.state.data, [name]: value }
    const error = null
    this.setState({ data, error })
  }

  handleMultiChange(e) {
    const gems = e.map(gem => gem.value)
    const data = {...this.state.data, gems: gems }
    this.setState({ data })

    //
    // const options = e.target.options
    // const value = []
    // for (var i = 0, l = options.length; i < l; i++) {
    //   if (options[i].selected) {
    //     value.push(options[i].value)
    //   }
    //   const data = {...this.state.data.gems, gems: value }
    //   this.setState({ data })
    // }
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log(this.state.data)
    axios
      .post('/api/trips', this.state.data, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(() => this.props.history.push('/trips'))
      .catch(() => this.setState({ error: 'An error occured' }))
  }

  componentDidMount() {
    axios.get('/api/gems')
      .then(res => {
        console.log(res)
        const options = res.data.map(gem => {
          return {'value': gem._id, 'label': gem.name}
        })
        this.setState({ options })
      })
  }

  render() {
    return(
      <div className="section">

        <TripsForm
          data={this.state.data}
          error={this.state.error}
          options = {this.state.options}
          handleChange={this.handleChange}
          handleMultiChange={this.handleMultiChange}
          handleSubmit={this.handleSubmit}
        />

      </div>
    )
  }
}

export default TripsNew
