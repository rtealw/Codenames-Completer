[![Build Status](https://travis-ci.com/csci312a-s19/color-picker-cra.svg?branch=master)](https://travis-ci.com/csci312a-s19/color-picker-cra)

## Introduction
Codenames Completer is a web app identifier for key cards in the original version of the board game Codenames.

## Process
Codenames Completer was created using React and in particular the JavaScript library React Konva.

## Use
You can visit the current version of the web app at [codenames-completer.herokuapp.com](http://codenames-completer.herokuapp.com/).

## Deploying to Heroku

The color picker can be deployed to [Heroku](https://heroku.com) using the recommended BuildPack and process described [here](https://github.com/mars/create-react-app-buildpack). Assuming you have already committed any changes, create and push the application to Heroku with:

```
heroku create --buildpack https://github.com/mars/create-react-app-buildpack.git
git push heroku master
```

To view the deployed application run `heroku open`.
