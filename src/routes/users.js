import Router from 'koa-route-class';

import userSchema from '../schemas/user';


const router = new Router({
  prefix: 'users',
});


const users = require('../../data/users.json');


router.get('/', async ctx => {
  ctx.body = userSchema.serialize(Object.keys(users).map(key => users[key]));
});

router.get('/:id', async (ctx, userId) => {
  try {
    const user = users[userId];
    ctx.body = userSchema.serialize(user);
  } catch (err) {
    ctx.status = err.statusCode;
    ctx.body = err;
  }
});


export default router;
