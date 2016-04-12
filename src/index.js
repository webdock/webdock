import http from 'http';
import Koa from 'koa';
import cors from 'koa-cors';

import routes from './routes';


const app = new Koa();

app.use(cors());

app.use(routes);


const server = http.createServer(app.callback());
server.listen(3000);
