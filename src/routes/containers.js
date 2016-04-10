import Router from 'koa-route-class';

import docker from '../docker';
import { formatImageId } from '../utils/images';


const router = new Router({
  prefix: 'containers',
});


router.get('/', async ctx => {
  const paramAll = true; // ctx.query.all !== undefined;
  const containers = await docker.listContainers({all: paramAll});

  ctx.body = {
    data: containers.map(container => {
      return {
        type: 'containers',
        id: container.Id,
        attributes: {
          names: container.Names,
          image: container.Image.match(/sha256\:/) ? '<none>' : container.Image,
          imageId: formatImageId(container.ImageID),
          status: container.Status,
          created: container.Created,
          command: container.Command,
          ports: container.Port,
        },
        relationships: {
        }
      };
    }),
  };
});

router.get('/:id', async (ctx, containerId) => {
  const containerRef = await docker.getContainer(containerId);
  try {
    const container = await containerRef.inspect();
    ctx.body = {
      container: {
        id: container.Id,
      }
    };
  } catch (err) {
    ctx.status = err.statusCode;
    ctx.body = err;
  }
});


export default router;
