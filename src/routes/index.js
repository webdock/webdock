import Router from 'koa-route-class';

import containerRouter from './containers';
import imageRouter from './images';
import eventsRouter from './events';


const router = new Router();

router.get('/', ctx => {
  ctx.body = 'hello webdock';
});

router.use(containerRouter.routes());
router.use(imageRouter.routes());
router.use(eventsRouter.routes());


export default async function (ctx, next) {
  const { app } = ctx;
  app.use(router.routes());
  await next();
};
