import React from 'react'
import IssueList from './IssueList'

const Repo = ({ repo: { repo, issues } }) => {
  return (
    <div className='panel panel-default'>
      <div className='panel-heading'>
        <span class="pull-right">{repo.description}</span>
        <h1 className='panel-title'>
          <a href={repo.html_url}>{repo.name}</a>
        </h1>
      </div>
      <IssueList issues={issues} />
    </div>
  )
}

export default Repo
