'use strict'

const _ = require('lodash')

const db = require('serverless-dynamodb-client').doc

const Twitter = require('twitter')
const twitter = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

const githubWebhooks = {
  /**
   * Receiving webhook from GitHub for IssuesEvents.
   * https://developer.github.com/v3/activity/events/types/#issuesevent
   *
   * For newly created issues tagged with `help wanted`a tweet is sent
   * on the @openwichita account.
   */
  issues (event, context, callback) {
    const eventBody = JSON.parse(event.body)

    checkShouldIgnoreIssue(eventBody)
      .then(shouldIgnore => {
        if (shouldIgnore) return callback(null, { statusCode: 200 })

        const repoName = eventBody.repository.name
        const issueUrl = eventBody.issue.html_url
        const status = tweetContent(repoName, issueUrl)

        return twitter.post('statuses/update', { status })
          .then(saveIssueAsProcessed(getIssueId(eventBody.issue, eventBody.repository)))
          .then(() => callback(null, { statusCode: 200 }))
          // Catch this here so we can see the output in serverless logs,
          // otherwise it just shows `[Object object]`, which isn't very helpful
          .catch(err => Promise.reject(JSON.stringify(err)))
      })
      .catch(callback)
  }
}

/**
 * Checks that the 'help wanted' label is applied, and checks DynamoDB
 * to see if we have processed this issue already.
 *
 * `true` === skip it
 * `false === process it
 */
const checkShouldIgnoreIssue = (eventData) => {
  const { issue, repository } = eventData

  // If 'help wanted' is not in the label list, we should ignore it
  if (!_.find(issue.labels, l => l.name === 'help wanted')) return Promise.resolve(true)
  if (issue.state !== 'open') return Promise.resolve(true)
  if (issue.assignee) return Promise.resolve(true)

  const resolver = (resolve, reject) => {
    db.get({
      TableName: process.env.ISSUES_TABLE,
      Key: { issueId: getIssueId(issue, repository) }
    }, (err, data) => {
      if (err) return reject(err)
      // If `Item` exists, we should ignore this one. If we haven't processed
      // this issue, `data` will be `{}`.
      return resolve(!!data.Item)
    })
  }

  return new Promise(resolver)
}

const saveIssueAsProcessed = (issueId) => db.put({
  TableName: process.env.ISSUES_TABLE,
  Item: { issueId, processed: true }
}).promise()

const getIssueId = (issue, repository) => `${repository.full_name}#${issue.number}`
const tweetContent = (repo, url) => `New help wanted issue on ${repo}! ${url}`

module.exports = githubWebhooks
