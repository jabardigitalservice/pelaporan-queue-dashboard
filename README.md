# Pelaporan Dashboard Queue
[![Maintainability](https://api.codeclimate.com/v1/badges/02d8ecaa0f0df6746e64/maintainability)](https://codeclimate.com/github/jabardigitalservice/pelaporan-queue-dashboard/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/02d8ecaa0f0df6746e64/test_coverage)](https://codeclimate.com/github/jabardigitalservice/pelaporan-queue-dashboard/test_coverage)
[![Node.js CI Production](https://github.com/jabardigitalservice/pelaporan-queue-dashboard/actions/workflows/production.yml/badge.svg)](https://github.com/jabardigitalservice/pelaporan-queue-dashboard/actions/workflows/production.yml)
[![made-with-expressjs](https://img.shields.io/badge/Made%20with-Expressjs-1f425f.svg)](https://expressjs.com/)
[![Ask Me Anything !](https://img.shields.io/badge/Ask%20me-anything-1abc9c.svg)](https://github.com/firmanJS)
[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/jabardigitalservice/pelaporan-queue-dashboard/blob/master/LICENSE)
[![GitHub release](https://img.shields.io/github/release/jabardigitalservice/pelaporan-queue-dashboard.svg)](https://github.com/jabardigitalservice/pelaporan-queue-dashboard/releases)
[![Github all releases](https://img.shields.io/github/downloads/jabardigitalservice/pelaporan-queue-dashboard/total.svg)](https://github.com/jabardigitalservice/pelaporan-queue-dashboard/releases)
[![GitHub issues](https://img.shields.io/github/issues/jabardigitalservice/pelaporan-queue-dashboard.svg)](https://github.com/jabardigitalservice/pelaporan-queue-dashboard/issues/)
[![GitHub pull-requests](https://img.shields.io/github/issues-pr/jabardigitalservice/pelaporan-queue-dashboard.svg)](https://github.com/jabardigitalservice/pelaporan-queue-dashboard/pulls/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

## Core Stack
- **Node.js** - [http://nodejs.org/](http://nodejs.org/)
- **Express** - [http://expressjs.com/](http://expressjs.com/)
- **nodemon** - [https://www.npmjs.com/package/nodemon](https://www.npmjs.com/package/nodemon)
<!-- - **pm2** - [https://www.npmjs.com/package/pm2](https://www.npmjs.com/package/pm2) -->

## Feature
1. error handling
1. database structure folder
1. testing with jest
1. coverage use jest
1. with docker example
1. validiation, use express-valdator and joi
1. custom message api response
1. eslint airbnb base
1. clustering mode manual using cluster module [https://nodejs.org/api/cluster.html](https://nodejs.org/api/cluster.html)

## Unit testing
- **jestjs** - [https://jestjs.io/](https://jestjs.io/)

## How To run

### copy environment variable

```sh
cp .env-sample .env
```

### run manualy

* via yarn or npm :

```sh
# install package
npm install or yarn install

#  running app
npm run dev or yarn dev

# running unit tetsing
npm run test or yarn test
```

* via make :

```sh
# start aplication with docker and build
make docker-build 

# start aplication with docker
make docker-start 

# stop docker container
make docker-stop 

# remove docker container
make docker-down 
```

### run with docker-compose

```sh
docker-compose -f docker-compose-development.yml up --build
```

### or run with background process

```sh
docker-compose -f docker-compose-development.yml up --build -d
```
### execution yarn with docker container
```sh
# install package
docker-compose -f docker-compose-development.yml exec dashboard-queue yarn install

# running unit testing and coverage
docker-compose -f docker-compose-development.yml exec dashboard-queue yarn run test:coverage
```

## Project Structure
```
.
├── .github/            * all workflows github actions
├── caprover/           * for deployment in caprover
├── coverage/           * all output coverage
├── docker/             * all dockerfile
├── src/                * all source code in here
  └── api/              * all api file here
  └── config/           * all configuration file here
  |  └── db.js         * configuration database
  └── database/         * all models schema file here
  |   └── models        * all models file
  |   └── migrations    * all migrations file
  |   └── seeders       * all seeders file
  └── middleware/       * all middleware file here, for check before next to api
  └── routes/           * all file route here
  |   └── index.js      * register all route
  └── test/             * all test file here
  |   └── index.js      * test apps
  └── utils/            * all utils file here

```

## Code Style Guides
* Guideline:
  * Single repo style
  * Use camelCase for variable name, naming function, and naming file api, and routes
  * Use UpperCase for Constant Variable
  * Use PascalCase for models name and required models
  * Use snake_case for file name as variable
  * Function name use Verb
  * Variable name use Noun
