import React from 'react'
import Repo from './Repo'

const App = ({ data }) => {
  return (
    <div className='container'>
      <div className='row App-header'>
        <div className='col-xs-12'>
          <h2>Open Wichita: Help Wanted</h2>
        </div>
      </div>

      <div className='row App-body'>
        <div className='col-xs-12'>
          {data.map(repo => (<Repo repo={repo} />))}
        </div>
      </div>
    </div>
  )
}

// TODO: get issues before rendering?

export default App
