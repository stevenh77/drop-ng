# drop-ng
An AngularJS wrapper module for Drop.js

## Source
[https://github.com/stevenh77/drop-ng](https://github.com/stevenh77/drop-ng)

## Installing drop-ng in your app
Type `bower install drop-ng --save` 

## Prerequisites for development
Install [Node.js](http://nodejs.org)

Install these NPM packages globally:

`npm install -g bower http-server`

## Installing Packages
- Open terminal at root folder
- Type `npm install`
- Type `bower install`

## Running the examples
Type `http-server` and browse to [http://localhost:8080/example/simple](http://localhost:8080/example/simple) to run the simple example

## Unit Tests
Type `karma start karma.config.js`

## Setting up e2e Tests
Setting up protractor and selenium:

-   Install JDK: [http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
- 	Type `npm install -g protractor`
- 	Type `webdriver-manager update` 

## Running e2e Tests
-  Open new terminal and type `webdriver-manager start`
-  Open new terminal and type: `http-server`
-  Open new terminal and type: `protractor protractor.config.js`