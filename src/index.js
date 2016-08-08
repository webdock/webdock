import cors from 'kcors';
import jwt from 'koa-jwt';
import pathMatch from 'koa-path-match';
import bodyParser from 'koa-bodyparser';

import app from './app';
import routes from './routes';
import { authenticateRoute } from './routes/authenticate';
import { SECRET_KEY } from './constants';

const route = pathMatch();

app.use(cors({
  allowHeaders: 'Authorization',
}));
app.use(bodyParser());

app.use(route('/api/authenticate').post(authenticateRoute));

app.use(jwt({ secret: SECRET_KEY }));

app.use(routes);
