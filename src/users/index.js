import { authenticate, index, detail } from './route';
import route from '../utils/route';

export default app => {
  app.use(route('/api/authenticate').post(authenticate));
  app.use(route('/api/users').post(index));
  app.use(route('/api/users/:id').post(detail));
};
