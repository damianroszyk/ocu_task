# Pitched Web Application

## System Dependencies
* NodeJS & NPM

## Fetching application dependencies
```
npm install
```

## Running development environment with browser-sync instance
```
npm start
```

## Running development environment with webpack hot module replacement
```
npm run start:hot
```

## Building application for specific environment
'env' parameter value is representing JSON file that contains environment-specific variables and needs to be defined in variables directory.
QA variables are used by default
```
npm run build -- --env=dev|qa|stg|prod
```

## Linting files
```
npm run lint
```

## Running e2e tests on development environment
```
npm start && npm run e2e:dev
```

## Running e2e tests on continuous integration server
```
npm run build && npm run e2e:ci
```
