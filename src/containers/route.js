import { listContainers, containerDetail } from './source';
import containerSchema from './schema';

export const index = async ctx => {
  const containerDetails = await listContainers();
  ctx.body = containerSchema.serialize(containerDetails);
};

export const detail = async ctx => {
  const containerRef = await containerDetail(ctx.params.id);
  try {
    const container = await containerRef.inspect();
    ctx.body = containerSchema.serialize(container);
  } catch (err) {
    ctx.status = err.statusCode || 500;
    ctx.body = err;
  }
};

export const remove = async ctx => {
  const containerRef = await containerDetail(ctx.params.id);

  try {
    const result = await containerRef.remove();
    ctx.body = null;
  } catch (err) {
    ctx.status = err.statusCode || 500;
    ctx.body = err;
  }
};

export const start = async ctx => {
  const containerRef = await containerDetail(ctx.params.id);

  try {
    await containerRef.start();

    const container = await containerRef.inspect();
    ctx.body = containerSchema.serialize(container);
  } catch (err) {
    ctx.status = err.statusCode || 500;
    ctx.body = err;
  }
};

export const stop = async ctx => {
  const containerRef = await containerDetail(ctx.params.id);

  try {
    await containerRef.stop();

    const container = await containerRef.inspect();
    ctx.body = containerSchema.serialize(container);
  } catch (err) {
    ctx.status = err.statusCode || 500;
    ctx.body = err;
  }
};
