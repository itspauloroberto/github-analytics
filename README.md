# GitHub Analytics (MVP)

This project was inspired on a coding challenge provided by Flexiana Company. It was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to run the Application?

In the project directory, you can run:

### `npm install` or `yarn`

Installs the requires dependencies to make the application work properly when running it.

### `npm start` or `yarn start`

Runs the app in the development mode, with hot raloading enabled and showing lint errors on console.

### `npm test` or `yarn test`

Runs the test suite running all the unit test cases available on the application and show the results. It's also run on the Pipeline of this repository within the Test and Deploy GitHub Action. It validates the code being pushed to the repository.

## In case you do not want to run the application

You can see a deployed demo published on Heroku right here: https://github-analytics-mvp.herokuapp.com/ 

# Important info

There are some environment variables necessary for running the application locally. But for security reasons they are not available on the repository. By the way here is the explanation about each of them:

- `REACT_APP_GITHUB_API`: It's the URI endpoint of GitHub API. (usually https://api.github.com)
- `REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN`: It's a token that indicates which access you have from the API. You can generate for your github account if you need one, you can generate it here: https://github.com/settings/tokens
- `REACT_APP_GITHUB_EXTERNAL_URL`: It's the GitHub URL itself used to create links on the app. (usually https://github.com/)
