import docker from '../docker';
import imageSchema from './schema';

export const index = async ctx => {
  const dockerImages = await docker.listImages();
  ctx.body = imageSchema.serialize(dockerImages);
};

export const detail = async ctx => {
  const imageRef = await docker.getImage(ctx.params.id);

  try {
    const dockerImage = await imageRef.inspect();

    ctx.body = imageSchema.serialize(dockerImage);
  } catch (err) {
    ctx.status = err.statusCode;
    ctx.body = err;
  }
};
