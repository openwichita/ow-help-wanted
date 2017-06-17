import React from 'react'
import IssueList from './IssueList'

const renderTopics = (topics) => {
  if (topics.length > 0) return (
    <p className='small'>
      <strong>Topics: </strong>
      {topics.join(', ')}
    </p>
  )
}

const Repo = ({ repo: { repo, issues } }) => {
  return (
    <div className='panel panel-default'>
      <div className='panel-heading'>
        <h3>
          <a href={repo.html_url}>{repo.name}</a>
        </h3>
      </div>
      <div className='panel-body'>
        <p>{repo.description}</p>
        {renderTopics(repo.topics)}
      </div>
      <IssueList issues={issues} />
    </div>
  )
}

export default Repo
