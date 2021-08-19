# project-nullptr
Repository for project NullPointerException

## Movie Search
A web application that allows users to search for movies based on celebrity images

#### Members
| Name        | ccis-id |
| ----------- | ------- |
| Yibin Zhang | zhangyb |
| Sichen Wang | sichen  |

## Heroku Link
https://cs5610-movie-search.herokuapp.com

## Presentation Link
https://youtu.be/qCCVBIRQc9s

## Tech Stack

Front-end: React

Back-end: Node.js, Express.js

Database: MongoDB

## Directory Structure
#### [config:](config)
    mongo.js: configuration file for MongoDB
    passport.js: configuration file for Passport.js
    sight-engine.js: API user and API key for the SightEngine API
    tmdb.js: API key for The Movie Database(TMBd) API
#### [docs:](docs)
    documentations
    backend.pdf: initial design of the backend data structure
    presentation.pdf: ppt for the presentation
#### [models:](models)
    Data schemas for MongoDB
#### [public:](public)
    resulting JS files after compiling the JSX files in the src directory using the Babel compiler
    /components: React components
    /services: functions that interact with back-end
    
    other public resources
    /image: default images that are used if the image returned from APIs can not be found
    /stylesheets: CSS stylesheets
#### [routes:](routes)
    Endpoints/Routes design
#### [src:](src)
    JSX files used for development
    /components: React components
    /services: functions that interact with back-end
#### [test:](test)
    unit test files
    /parts: unit test files for test 1~3
    gen_user.js: generate test users for unit tests

## Installation
run `npm install` in the root directory for installation  
run `npm start` to start the server

## Running unit tests
run `npm run test1` `npm run test2` `npm run test2` `npm run test3` `npm run test3` sequentially  
1.the first `npm run test1` will test creating test users  
2.the first `npm run test2` will test adding celebrity data to the database  
3.the second `npm run test2` will test adding movie to the database based on previous test data  
4.the first `npm run test3` will test adding collections for test users  
5.the second `npm run test3` will test deleting collections and movies for test users  

