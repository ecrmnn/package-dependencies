const request = require('request');

exports.getAll = (username, repository, branch, callback) => {

  if (typeof  branch === 'function') {
    callback = branch;
    branch = 'master';
  }

  request.get(`https://raw.github.com/${username}/${repository}/${branch}/package.json`,
    (error, response, body) => {
      if (!error && response.statusCode == 200) {
        const pckg = JSON.parse(body);

        callback({
          dependencies: Object.keys(pckg['dependencies']),
          devDependencies: Object.keys(pckg['devDependencies'])
        });
      } else {
        callback({
          dependencies: [],
          devDependencies: []
        });
      }
    });
};

exports.getDependencies = (username, repository, branch, callback) => {
  this.getAll(username, repository, branch, allDependencies => {
    callback(allDependencies['dependencies']);
  });
};

exports.getDevDependencies = (username, repository, branch, callback) => {
  this.getAll(username, repository, branch, allDependencies => {
    callback(allDependencies['devDependencies']);
  });
};
