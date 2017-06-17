'use strict'

const request = require('request')
const requestPromise = require('request-promise')

const authStr = new Buffer(`${process.env.GITHUB_USERNAME}:${process.env.GITHUB_AUTH_TOKEN}`).toString('base64')
const ghRequest = resource => requestPromise({
  headers: {
    'user-agent': 'ow-help-wanted-service',
    'content-type': 'application/json',
    'accept': 'application/vnd.github.mercy-preview+json',
    'authorization': `Basic ${authStr}`
  },
  uri: `https://api.github.com/${resource}`
})

module.exports.githubData = (event, context, callback) => {
  ghRequest('orgs/openwichita/repos').then(repos => {
    Promise.all(JSON.parse(repos).filter(repo => repo.open_issues_count > 0).map(repo => {
      const helpWantedIssues = `repos/${repo.full_name}/issues?labels=help%20wanted`
      return ghRequest(helpWantedIssues).then(issues => ({ repo, issues: JSON.parse(issues) }))
    })).then(results => {
      callback(null, {
        statusCode: 200,
        headers: { 'access-control-allow-origin': '*' },
        body: JSON.stringify({
          data: results.filter(x => x.issues.length > 0)
        })
      })
    })
  }).catch(callback)
}
