import Router from 'koa-route-class';

const router = new Router();

const apiRouter = new Router({
  prefix: '/api',
});

router.use(apiRouter.routes());

router.get('/', ctx => {
  ctx.body = 'hello webdock';
});

export default async function (ctx, next) {
  const { app } = ctx;
  app.use(router.routes());
  await next();
};
