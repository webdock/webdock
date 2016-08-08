import http from 'http';
import Koa from 'koa';
import cors from 'kcors';
import jwt from 'koa-jwt';
import bodyParser from 'koa-bodyparser';

import routes from './routes';
import { SECRET_KEY } from './constants';
import userRoutes from './users';
import containerRoutes from './containers';

const app = new Koa();

app.use(cors({
  allowHeaders: ['Authorization', 'Content-Type'],
}));
app.use(bodyParser());

app.use(jwt({ secret: SECRET_KEY }).unless({
  method: 'OPTIONS',
  path: '/api/authenticate',
}));

userRoutes(app);
containerRoutes(app);
app.use(routes);

const server = http.createServer(app.callback());
server.listen(3000);
console.log('Server listening to http://127.0.0.1:3000/.'); // eslint-disable-line no-console
