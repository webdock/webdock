import Router from 'koa-route-class';

import docker from '../docker';


const router = new Router();


router.get('/containers', async ctx => {
  const containers = await docker.listContainers({all: true});
  ctx.body = containers;
});

router.get('/containers/:id', async (ctx, containerId) => {
  ctx.body = await docker.getContainer(containerId);
});


export default router;
