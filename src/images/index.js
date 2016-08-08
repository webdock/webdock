import { index, detail } from './route';
import route from '../utils/route';

export default app => {
  app.use(route('/api/images').get(index));
  app.use(route('/api/images/:id').get(detail));
};
