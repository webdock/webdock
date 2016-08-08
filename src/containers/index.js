import { index, detail } from './route';
import route from '../utils/route';

export default app => {
  app.use(route('/api/containers').get(index));
  app.use(route('/api/containers/:containerId').get(detail));
};
