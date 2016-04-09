import Docker from 'dockerode';

const docker = new Docker();

docker.listContainers({all: true}, (err, containers) => console.log(err, containers));
