import React from 'react'
import IssueRow from './IssueRow'

const IssueList = ({ issues }) => {
  return (
    <table className='table table-bordered'>
      <thead>
        <tr>
          <th>Issue</th>
          <th>Tags</th>
          <th>Opened On</th>
          <th>Assigned To</th>
        </tr>
      </thead>
      <tbody>
        {issues.map(issue => <IssueRow issue={issue} />)}
      </tbody>
    </table>
  )
}

export default IssueList
