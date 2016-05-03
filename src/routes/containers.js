import Router from 'koa-route-class';

import primus from '../primus';
import { listContainers, containerDetail } from '../sources/container';
import containerSchema from '../schemas/container';


const router = new Router({
  prefix: 'containers',
});


const channel = primus.channel('containers');

channel.on('connection', spark => {
  spark.on('data', async () => {
    const containerDetails = await listContainers();
    spark.write(containerSchema.serialize(containerDetails));
  });
});

router.get('/', async ctx => {
  const containerDetails = await listContainers();
  ctx.body = containerSchema.serialize(containerDetails);
});

router.get('/:id', async (ctx, containerId) => {
  const containerRef = await containerDetail(containerId);
  try {
    const container = await containerRef.inspect();
    ctx.body = containerSchema.serialize(container);
  } catch (err) {
    ctx.status = err.statusCode || 500;
    ctx.body = err;
  }
});


export default router;
