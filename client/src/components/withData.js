import React, { Component } from 'react'
import PropTypes from 'prop-types'

const withData = props => WrappedComponent => {
  return class WithData extends Component {
    static defaultProps = {
      url: 'https://7kwo0tuep0.execute-api.us-east-1.amazonaws.com/dev/github/data'
    }

    static propTypes = {
      url: PropTypes.string
    }

    state = {
      data: null,
      error: null,
      isLoading: true
    }

    async componentDidMount () {
      const headers = { header: new Headers({'content-type': 'application/json'})}

      try {
        const res = await fetch(this.props.url, headers)
        const { data } = await res.json()
        this.setState({data})
      } catch (error) {
        this.setState({error})
      } finally {
        this.setState({isLoading: false})
      }
    }

    render () {
      return (
        <WrappedComponent 
          {...props} 
          data={this.state.data} 
          error={this.state.error}
          isLoading={this.state.isLoading}
        />
      )
    }
  }
}

export default withData
