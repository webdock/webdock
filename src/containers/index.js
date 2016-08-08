import { index, detail, start, stop } from './route';
import route from '../utils/route';

export default app => {
  app.use(route('/api/containers').get(index));
  app.use(route('/api/containers/:id').get(detail));
  app.use(route('/api/containers/:id/start').post(start));
  app.use(route('/api/containers/:id/stop').post(stop));
};
