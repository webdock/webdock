import route from '../utils/route';

export default app => {
  app.use(route('/api/').get(ctx => {
    ctx.body = 'hello webdock';
  }));
};
