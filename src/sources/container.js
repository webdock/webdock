import docker from '../docker';


export const listContainers = async (paramAll = true) => {
  const containers = await docker.listContainers({all: paramAll});

  const containerDetails = [];
  for (let index in containers) {
    const containerRef = await docker.getContainer(containers[index].Id);
    const containerDetail = await containerRef.inspect();
    containerDetails.push(containerDetail);
  }

  return containerDetails;
};


export const containerDetail = async (id) => {
  return await docker.getContainer(id);
};
