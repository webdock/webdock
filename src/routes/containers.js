import Router from 'koa-route-class';

import docker from '../docker';


const router = new Router();


router.get('/containers', async ctx => {
  const paramAll = true; // ctx.query.all !== undefined;
  const containers = await docker.listContainers({all: paramAll});

  ctx.body = {
    containers: containers.map(container => {
      return {
        id: container.Id,
        names: container.Names,
        image: container.Image,
        imageId: container.ImageId,
        status: container.Status,
        created: container.Created,
        command: container.Command,
        ports: container.Port,
      };
    }),
  };
});

router.get('/containers/:id', async (ctx, containerId) => {
  const container = await docker.getContainer(containerId);
  try {
    ctx.body = await container.inspect();
  } catch (err) {
    ctx.status = err.statusCode;
    ctx.body = err;
  }
});


export default router;
