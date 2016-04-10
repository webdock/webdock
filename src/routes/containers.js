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
        imageId: container.ImageID,
        status: container.Status,
        created: container.Created,
        command: container.Command,
        ports: container.Port,
      };
    }),
  };
});

router.get('/containers/:id', async (ctx, containerId) => {
  const containerRef = await docker.getContainer(containerId);
  try {
    const container = await containerRef.inspect();
    ctx.body = {
      container: {
        id: container.Id,
      }
    };
  } catch (err) {
    ctx.status = err.statusCode;
    ctx.body = err;
  }
});


export default router;
