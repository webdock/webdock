import Router from 'koa-route-class';

import containerRouter from './containers';


const router = new Router();

router.get('/', ctx => {
  ctx.body = 'hello webdock';
});

router.use(containerRouter.routes());


export default async function (ctx, next) {
  const { app } = ctx;
  app.use(router.routes());
  await next();
};
