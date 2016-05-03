import cors from 'koa-cors';

import app from './app';

import routes from './routes';


app.use(cors());

app.use(routes);
