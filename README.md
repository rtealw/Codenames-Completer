[![Build Status](https://travis-ci.com/csci312a-s19/color-picker-cra.svg?branch=master)](https://travis-ci.com/csci312a-s19/color-picker-cra)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and all of the key CRA commands, e.g. `npm start` and `npm test` are available. For simplicity we removed some features, namely service workers.

We further installed the [prop-types](https://www.npmjs.com/package/prop-types) as an explicit dependency.

```
npm install --save prop-types
```

For styling we use [Styled Components](https://styled-components.com), installed via

```
npm install --save styled-components
```

## Linting and Formatting

We utilize the ESLint configuration built into CRA (which is more permissive than the AirBnB configuration). The linter is run automatically by the CRA development server, or can be run manually with `npm run lint`.

The AirBnB rules do not integrate smoothly with the current version of CRA. Thus we have added our own rules to `.eslintrc.json`. Thus you will get a different, and more expansive set of warnings and errors, when you run `npm run lint` than with the output provided by the CRA development server.

To ensure consistent style we use the CRA-recommended [Prettier](https://github.com/prettier/prettier) package. We installed it with

```
npm install --save-dev husky lint-staged prettier
```

and added the recommended configuration to automatically reformat code during the commit. That is whenever you commit your code, Prettier will automatically reformat your code during the commit process (as a "hook").

## Deploying to Heroku

The color picker can be deployed to [Heroku](https://heroku.com) using the recommended BuildPack and process described [here](https://github.com/mars/create-react-app-buildpack). Assuming you have already committed any changes, create and push the application to Heroku with:

```
heroku create --buildpack https://github.com/mars/create-react-app-buildpack.git
git push heroku master
```

To view the deployed application run `heroku open`.
