import Router from 'koa-route-class';

import docker from '../docker';


const router = new Router();


router.get('/containers', async ctx => {
  ctx.body = await docker.listContainers({all: true});
});

router.get('/containers/:id', async (ctx, containerId) => {
  ctx.body = await docker.getContainer(containerId);
});


export default router;
