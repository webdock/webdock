const Docker = require('dockerode');

const docker = new Docker();

docker.listContainers({all: true}, function (err, containers) {
  console.log(err, containers);
});
