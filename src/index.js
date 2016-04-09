import Docker from 'dockerode';

const docker = new Docker();


docker.listContainers({all: true}, (err, containers) => {
  if (containers.length > 0) {
    console.log(containers);

    if (containers.length > 0) {
      const containerId = containers[0].Id;
      const container = docker.getContainer(containerId);

      container.inspect((err, data) => {
        console.log(err, data);
      });
    }
  }
});
