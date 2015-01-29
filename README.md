# drop-ng
An AngularJS wrapper module for Drop.js

## Source
[https://github.com/stevenh77/drop-ng](https://github.com/stevenh77/drop-ng)

## Prerequisites
Install [Node.js](http://nodejs.org)

Install these NPM packages globally:

`npm install -g bower http-server`

## Installing Packages
- Open terminal at root folder
- Type `npm install`
- Type `bower install`

## Running
Type `http-server` and browse to `http://localhost:8080/example/simple` to run the simple example

## Unit Tests
Type 'karma start karma.config.js'

## e2e Tests
- Setting up protractor and selenium
-   Install JDK:  http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html
- 	npm install -g protractor
- 	webdriver-manager update 
-
- To run 2e2 tests:
-  Open new terminal and type 'webdriver-manager start'
-  Open new terminal and type: 'http-server'
-  Open new terminal and type: 'protractor protractor.config.js'