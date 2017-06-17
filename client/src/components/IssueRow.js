import React from 'react'
import moment from 'moment'

const IssueRow = ({ issue }) => {
  return (
    <tr>
      <td>
        <a href={issue.html_url}>{issue.title}</a>
      </td>
      <td>{issue.labels.map(l => l.name).join(', ')}</td>
      <td>{moment(issue.created_at).format('MMM D, YYYY')}</td>
    </tr>
  )
}

export default IssueRow
