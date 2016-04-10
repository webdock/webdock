import Router from 'koa-route-class';

import docker from '../docker';


const router = new Router();


router.get('/images', async ctx => {
  const dockerImages = await docker.listImages();
  ctx.body = {
    images: dockerImages.map(image => {
      return {
        id: image.Id.replace(/sha256\:/, ''),
        parentId: image.ParentId.replace(/sha256\:/, ''),
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
    ctx.body = dockerImage;
  } catch (err) {
    ctx.status = err.statusCode;
    ctx.body = err;
  }
});


export default router;
