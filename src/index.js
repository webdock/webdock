import cors from 'koa-cors';

import app from './app';
import primus from './primus';

import docker from './docker';
import routes from './routes';
import containerSchema from './schemas/container';


app.use(cors());

app.use(routes);


const events = primus.channel('events');


(async () => {
  const dockerEvents = await docker.getEvents();

  dockerEvents.on('data', async data => {
    const dockerEvent = JSON.parse(data.toString('utf8'));

    if (dockerEvent.Type === 'container') {
      const dockerContainerRef = await docker.getContainer(dockerEvent.Actor.ID);

      const dockerContainer = await dockerContainerRef.inspect();

      events.write(containerSchema.serialize(dockerContainer));
    }
  });
})();
