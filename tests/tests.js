const test = require('ava');
const packageDependencies = require('../');

const username = 'ecrmnn';
const repository = 'spaceholder';
const branch = '1.3.1';

let allDependencies = [];
let dependencies = [];
let devDependencies = [];

let notAGithubUsersAllDependencies = [];

let branchOmittedAllDependencies = [];

/**
 * Get dependencies from ecrmnn/spaceholder 1.3.1
 */
test.cb.before(t => {
  packageDependencies.getAll(username, repository, branch, function (all) {
    allDependencies = all;
    t.end();
  });
});

test.cb.before(t => {
  packageDependencies.getDependencies(username, repository, branch, function (_dependencies) {
    dependencies = _dependencies;
    t.end();
  });
});

test.cb.before(t => {
  packageDependencies.getDevDependencies(username, repository, branch, function (_devDependencies) {
    devDependencies = _devDependencies;
    t.end();
  });
});

test('getAll should contain dependencies and devDependencies', t => {
  const keys = Object.keys(allDependencies);
  t.same(keys, ['dependencies', 'devDependencies']);
});

test('getDependencies should not be empty', t => {
  t.ok(dependencies.length);
});

test('getDependencies should contain commander', t => {
  const isInArray = dependencies.indexOf('commander') >= 0;
  t.true(isInArray);
});

test('getDevDependencies should contain mocha', t => {
  t.ok(devDependencies.length);
});

test('getDevDependencies should contain mocha', t => {
  const isInArray = devDependencies.indexOf('mocha') >= 0;
  t.true(isInArray);
});

test('getDevDependencies should not contain guttle', t => {
  const isInArray = devDependencies.indexOf('guttle') >= 0;
  t.false(isInArray);
});

/**
 * Branch can be omitted. Will default to master
 */
test.cb.before(t => {
  packageDependencies.getAll(username, repository, function (all) {
    branchOmittedAllDependencies = all;
    t.end();
  });
});

test('Branch can be omitted', t => {
  t.same(branchOmittedAllDependencies, allDependencies);
});

/**
 * Get dependencies from not-a-github-user/not-a-repo 13.3.7
 */
test.cb.before(t => {
  packageDependencies.getAll('not-a-github-user', 'not-a-repo', '13.3.7', function (all) {
    notAGithubUsersAllDependencies = all;
    t.end();
  });
});

test('If invalid user, repo or version, dependencies should be empty', t => {
  t.notOk(notAGithubUsersAllDependencies.dependencies.length);
});
