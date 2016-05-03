import http from 'http';
import Koa from 'koa';


const app = new Koa();

export const server = http.createServer(app.callback());
server.listen(3000);
console.log('Server listening to http://127.0.0.1:3000/.'); // eslint-disable-line no-console


export default app;
