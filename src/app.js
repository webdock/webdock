import http from 'http';
import Koa from 'koa';


const app = new Koa();

export const server = http.createServer(app.callback());
server.listen(3000);


export default app;
