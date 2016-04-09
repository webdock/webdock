import route from 'koa-route';


const routes = new Map();

routes.set('/', ctx => {
  ctx.body = 'hello webdock';
});


export default async function (ctx, next) {
  const { app } = ctx;

  for (const [path, fn] of routes) {
    app.use(route.get(path, fn));
  }

  await next();
};
