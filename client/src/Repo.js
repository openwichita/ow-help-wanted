import React from 'react'
import IssueList from './IssueList'

const Repo = ({ repo: { repo, issues } }) => {
  return (
    <div className='panel panel-default'>
      <div className='panel-heading'>
        <h3 className='panel-title'>
          <a href={repo.url}>{repo.name}</a>
        </h3>
      </div>
      <IssueList issues={issues} repo={repo} />
    </div>
  )
}

export default Repo
