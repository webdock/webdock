import http from 'http';
import Koa from 'koa';
import cors from 'kcors';
import jwt from 'koa-jwt';
import bodyParser from 'koa-bodyparser';

import routes from './routes';
import { authenticateRoute } from './routes/authenticate';
import { SECRET_KEY } from './constants';
import containerRoutes from './containers';
import route from './utils/route';

const app = new Koa();

app.use(cors({
  allowHeaders: ['Authorization', 'Content-Type'],
}));
app.use(bodyParser());

containerRoutes(app);

app.use(route('/api/authenticate').post(authenticateRoute));

app.use(jwt({ secret: SECRET_KEY }).unless({ method: 'OPTIONS' }));

app.use(routes);

const server = http.createServer(app.callback());
server.listen(3000);
console.log('Server listening to http://127.0.0.1:3000/.'); // eslint-disable-line no-console
