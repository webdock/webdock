import { index, detail, remove, start, stop } from './route';
import route from '../utils/route';

export default app => {
  app.use(route('/api/containers').get(index));
  app.use(route('/api/containers/:id').get(detail).delete(remove));
  app.use(route('/api/containers/:id/start').post(start));
  app.use(route('/api/containers/:id/stop').post(stop));
};
