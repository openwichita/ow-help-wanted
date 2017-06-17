import React from 'react'
import IssueRow from './IssueRow'

const IssueList = ({ issues, repo }) => {
  return (
    <table className='table table-bordered'>
      <thead>
        <tr>
          <th>Project</th>
          <th>Issue</th>
          <th>Tags</th>
          <th>Opened</th>
        </tr>
      </thead>
      <tbody>
        {issues.map(issue => <IssueRow issue={issue} repo={repo} />)}
      </tbody>
    </table>
  )
}

export default IssueList
