import http from 'http';
import Primus from 'primus';
import multiplex from 'primus-multiplex';
import Koa from 'koa';
import cors from 'koa-cors';

import docker from './docker';
import routes from './routes';
import containerSchema from './schemas/container';


const app = new Koa();

app.use(cors());

app.use(routes);


const server = http.createServer(app.callback());
server.listen(3000);


const primus = new Primus(server);
primus.use('multiplex', multiplex);
primus.library();


const events = primus.channel('events');


(async () => {
  const dockerEvents = await docker.getEvents();

  dockerEvents.on('data', (async data => {
    const dockerEvent = JSON.parse(data.toString('utf8'));

    if (dockerEvent.Type === 'container') {
      const dockerContainerRef = await docker.getContainer(dockerEvent.Actor.ID);

      const dockerContainer = await dockerContainerRef.inspect();

      events.write(containerSchema.serialize(dockerContainer));
    }
  }));
})();
