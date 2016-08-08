import Router from 'koa-route-class';

import imageRouter from './images';
import usersRouter from './users';


const router = new Router();

const apiRouter = new Router({
  prefix: '/api',
});

apiRouter.use(imageRouter.routes());
apiRouter.use(usersRouter.routes());

router.use(apiRouter.routes());

router.get('/', ctx => {
  ctx.body = 'hello webdock';
});

export default async function (ctx, next) {
  const { app } = ctx;
  app.use(router.routes());
  await next();
};
