import Router from 'koa-route-class';

import docker from '../docker';


const router = new Router();


router.get('/containers', async ctx => {
  const paramAll = ctx.query.all !== undefined;
  ctx.body = await docker.listContainers({all: paramAll});
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
