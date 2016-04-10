import Router from 'koa-route-class';

import docker from '../docker';
import { formatImageId } from '../utils/images';


const router = new Router();


router.get('/images', async ctx => {
  const dockerImages = await docker.listImages();
  ctx.body = {
    images: dockerImages.map(image => {
      return {
        id: formatImageId(image.Id),
        parentId: formatImageId(image.ParentId),
        repoTags: image.RepoTags,
        repoDigests: image.RepoDigests,
        created: image.Created,
        size: image.Size,
        virtualSize: image.VirtualSize,
        labels: image.Labels,
      };
    }),
  }
});

router.get('/images/:id', async (ctx, imageId) => {
  const imageRef = await docker.getImage(imageId);

  try {
    const dockerImage = await imageRef.inspect();

    ctx.body = {
      image: {
        id: formatImageId(dockerImage.Id),
      }
    };
  } catch (err) {
    ctx.status = err.statusCode;
    ctx.body = err;
  }
});


export default router;
