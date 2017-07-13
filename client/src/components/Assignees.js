import React from 'react'

const Assignees = assignee => {
  const person = assignee.assignee;
  if (person) {
      return (
      <a href={person.html_url}>
        <img title={person.login} src={person.avatar_url} />
      </a>
    )
  }
}

export default Assignees
