import React from 'react'
import moment from 'moment'

const IssueRow = ({ issue, repo }) => {
  return (
    <tr>
      <td>{repo.name}</td>
      <td>{issue.title}</td>
      <td>{issue.labels.map(l => l.name).join(', ')}</td>
      <td>{moment(issue.created_at).format('MMM D, YYYY')}</td>
    </tr>
  )
}

export default IssueRow
