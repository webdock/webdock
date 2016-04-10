import Router from 'koa-route-class';

import containerRouter from './containers';
import imageRouter from './images';
import eventsRouter from './events';


const router = new Router();

const apiRouter = new Router({
  prefix: '/api',
});

apiRouter.use(containerRouter.routes());
apiRouter.use(imageRouter.routes());
apiRouter.use(eventsRouter.routes());

router.use(apiRouter.routes());

router.get('/', ctx => {
  ctx.body = 'hello webdock';
});

export default async function (ctx, next) {
  const { app } = ctx;
  app.use(router.routes());
  await next();
};
