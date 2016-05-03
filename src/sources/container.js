import docker from '../docker';


export const listContainers = async (paramAll = true) => {
  const containers = await docker.listContainers({
    all: paramAll,
  });

  const result = [];
  await Promise.all(containers.map(async container => {
    const containerRef = await docker.getContainer(container.Id);
    return result.push(await containerRef.inspect());
  }));

  return result;
};


export const containerDetail = async id =>
  await docker.getContainer(id);
