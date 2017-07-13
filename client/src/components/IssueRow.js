import React from 'react'
import moment from 'moment'
import Assignees from './Assignees'

const IssueRow = ({ issue }) => {
  return (
    <tr>
      <td className='issue'>
        <a href={issue.html_url}>{issue.title}</a>
      </td>
      <td className='tags'>{issue.labels.map(l => l.name).join(', ')}</td>
      <td className='date'>{moment(issue.created_at).format('MMM D, YYYY')}</td>
      <td className='assignee'>{issue.assignees.map(assignee => (<Assignees assignee={assignee} />))}</td>
    </tr>
  )
}

export default IssueRow
