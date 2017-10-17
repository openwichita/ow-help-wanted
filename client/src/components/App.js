import React from 'react'
import Repo from './Repo'

const sortRepos = repos => repos.sort((a, b) => new Date(b.repo.pushed_at) - new Date(a.repo.pushed_at))

const App = ({ data }) => {
  return (
    <div className='container'>
      <header id='site-head'>
        <h1 className='site-title'><a href='/'>Open Wichita</a></h1>
      </header>

      <nav className='menu'>
        <ul>
          <li><a href='//openwichita.com'>Home</a></li>
          <li><a href='//openwichita.com/connect'>Connect</a></li>
          <li><a href='https://github.com/openwichita/docs'>Docs</a></li>
          <li><a href='https://meetup.com/openwichita'>Events</a></li>
          <li><a href='https://help.openwichita.com'>Projects</a></li>
          <li><a href='//openwichita.com/data'>Data</a></li>
        </ul>
      </nav>

      <div className='row App-body'>
        <div className='col-xs-12'>
          {sortRepos(data).map(repo => (<Repo repo={repo} />))}
        </div>
      </div>
    </div>
  )
}

export default App
