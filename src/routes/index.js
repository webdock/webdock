import route from 'koa-route';


class Router {
  constructor() {
    this.routeMap = new Map();
  }

  get(path, fn) {
    this.routeMap.set(path, fn);
  }

  routes() {
    const self = this;
    const dispatch = async (ctx, next) => {
      const { app } = ctx;

      for (const [path, fn] of self.routeMap) {
        app.use(route.get(path, fn));
      }

      await next();
    }
    return dispatch;
  }
}


const router = new Router();

router.get('/', ctx => {
  ctx.body = 'hello webdock';
});


export default async function (ctx, next) {
  const { app } = ctx;
  app.use(router.routes());
  await next();
};
