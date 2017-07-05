/* global fetch */
import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App'
import registerServiceWorker from './registerServiceWorker'

import './index.css'

fetch('https://7kwo0tuep0.execute-api.us-east-1.amazonaws.com/dev/github-data', {
  headers: new Headers({ 'content-type': 'application/json' })
}).then(response => response.json()).then(({ data }) => {
  ReactDOM.render(<App data={data} />, document.getElementById('root'))
  registerServiceWorker()
}).catch(console.log)
