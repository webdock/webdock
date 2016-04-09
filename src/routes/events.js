import Router from 'koa-route-class';

import docker from '../docker';


const router = new Router();


// warning this is a streaming response
router.get('/events', async ctx => {
  const events = await docker.getEvents();
  ctx.body = events;
});


export default router;
