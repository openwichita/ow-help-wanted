import React from 'react'
import Repo from './Repo'
import withData from './withData'

const sortRepos = repos => repos.sort((a, b) => new Date(b.repo.pushed_at) - new Date(a.repo.pushed_at))

const styles = {
  big: {
    fontSize: '36px',
    textAlign: 'center',
    marginTop: '50vh'
  }
}

const App = ({ data, isLoading }) => {
  if (isLoading) return <div style={styles.big}>Loading Issues...</div>

  return (
    <div className='container'>
      <div className='row App-header'>
        <div className='col-xs-12'>
          <h2>Open Wichita: Help Wanted</h2>
        </div>
      </div>

      <div className='row App-body'>
        <div className='col-xs-12'>
          {sortRepos(data).map(repo => (<Repo repo={repo} />))}
        </div>
      </div>
    </div>
  )
}

export default withData()(App)
