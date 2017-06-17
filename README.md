# help-wanted

A little app to display a list of issues in Open Wichita repos tagged with `help-wanted`.

### Uses

* [create-react-app](https://github.com/facebookincubator/create-react-app) for the client
  - This is what is used in the `client/` folder
* [serverless](https://serverless.com) for the github data service
  - This is used in the `service/` folder and is simply an AWS lambda function
    for getting our data from GitHub.

### Run Locally

Pretty much all of the work will be done in the client side, so just get that
booted up and it will pull data from the lambda function that's deployed.

```
$ git clone git@github.com:openwichita/ow-help-wanted.git`
$ cd ow-help-wanted/client
$ yarn install
$ yarn start
```

You should be able to replace `yarn` with `npm` if you want, but
create-react-app currently suggests using `yarn`.
