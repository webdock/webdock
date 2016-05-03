import Router from 'koa-route-class';

import containerSchema from '../schemas/container';
import docker from '../docker';
import primus from '../primus';


const router = new Router();


// warning this is a streaming response
router.get('/events', async ctx => {
  const events = await docker.getEvents();
  ctx.body = events;
});

// websocket part
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

export default router;
