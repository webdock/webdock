import Router from 'koa-route-class';

import docker from '../docker';
import imageSchema from '../schemas/image';
import { formatImageId } from '../utils/images';


const router = new Router({
  prefix: 'images',
});


router.get('/', async ctx => {
  const dockerImages = await docker.listImages();
  ctx.body = imageSchema.serialize(dockerImages);
});

router.get('/:id', async (ctx, imageId) => {
  const imageRef = await docker.getImage(imageId);

  try {
    const dockerImage = await imageRef.inspect();

    ctx.body = imageSchema.serialize(dockerImage);
  } catch (err) {
    ctx.status = err.statusCode;
    ctx.body = err;
  }
});


export default router;
