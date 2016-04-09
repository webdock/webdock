import Koa from 'koa';
import cors from 'koa-cors';

import routes from './routes';


const app = new Koa();

app.use(cors());

app.use(routes);


app.listen(3000);
