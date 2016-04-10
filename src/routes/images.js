import Router from 'koa-route-class';

import docker from '../docker';
import { formatImageId } from '../utils/images';


const router = new Router({
  prefix: 'images',
});


router.get('/', async ctx => {
  const dockerImages = await docker.listImages();
  ctx.body = {
    data: dockerImages.map(dockerImage => {
      return {
        type: 'images',
        id: formatImageId(dockerImage.Id),
        attributes: {
          'parent-id': formatImageId(dockerImage.ParentId),
          'repo-tags': dockerImage.RepoTags,
          'repo-digests': dockerImage.RepoDigests,
          'created': dockerImage.Created,
          'size': dockerImage.Size,
          'virtual-size': dockerImage.VirtualSize,
          'labels': dockerImage.Labels,
        },
        relationships: {
        }
      };
    }),
  }
});

router.get('/:id', async (ctx, imageId) => {
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
