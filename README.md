# package-dependencies [![Build Status](https://travis-ci.org/ecrmnn/package-dependencies.svg?branch=master)](https://travis-ci.org/ecrmnn/package-dependencies)

> Get package.json dependencies from a Github repository

### Install
```
npm install --save package-dependencies
```

### Usage
```javascript
const packageDependencies = require('package-dependencies');

packageDependencies.getAll('ecrmnn', 'spaceholder', '1.3.1', function (all) {
  console.log(all);
  //=> {dependencies: ['commander', 'random-string'], devDependencies: ['chai', 'mocha']}
});
```
```javascript
const packageDependencies = require('package-dependencies');

packageDependencies.getDependencies('ecrmnn', 'spaceholder', '1.3.1', function (deps) {
  console.log(deps);
  //=> ['commander', 'random-string']
});
```
```javascript
const packageDependencies = require('package-dependencies');

packageDependencies.getDevDependencies('ecrmnn', 'spaceholder', '1.3.1', function (devDeps) {
  console.log(devDeps);
  //=> ['chai', 'mocha']
});
```

### License
MIT © [Daniel Eckermann](http://danieleckermann.com)