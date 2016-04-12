import Router from 'koa-route-class';

import containerSchema from '../schemas/container';
import docker from '../docker';


const router = new Router({
  prefix: 'containers',
});


router.get('/', async ctx => {
  const paramAll = true; // ctx.query.all !== undefined;
  const containers = await docker.listContainers({all: paramAll});

  ctx.body = containerSchema.serialize(containers);
});

router.get('/:id', async (ctx, containerId) => {
  const containerRef = await docker.getContainer(containerId);
  try {
    const container = await containerRef.inspect();
    ctx.body = containerSchema.serialize(container);
  } catch (err) {
    ctx.status = err.statusCode || 500;
    ctx.body = err;
  }
});


export default router;
