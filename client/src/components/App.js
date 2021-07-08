import React from 'react'
import Repo from './Repo'

const sortRepos = repos => repos.sort((a, b) => new Date(b.repo.pushed_at) - new Date(a.repo.pushed_at))

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
          {sortRepos(data).map(repo => (<Repo repo={repo} key={repo.repo.id} />))}
        </div>
      </div>
    </div>
  )
}

export default App
