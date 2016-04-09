import Router from 'koa-route-class';

import docker from '../docker';


const router = new Router();


router.get('/images', async ctx => {
  ctx.body = await docker.listImages();
});


export default router;
