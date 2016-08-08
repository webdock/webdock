import users from '../../data/users.json';
import jwt from 'jsonwebtoken';

import { SECRET_KEY } from '../constants';

const userArray = Object.values(users);

const error = (ctx, message, statusCode = 400) => {
  ctx.status = statusCode;
  ctx.body = { message, statusCode };
};

export const authenticateRoute = ctx => {
  const { email, password } = ctx.request.body;

  if (!email) {
    return error(ctx, 'Email is missing.');
  }
  if (!password) {
    return error(ctx, 'Password is missing.');
  }

  const user = userArray.find(el => el.email === email && el.password === password);

  if (!user) {
    return error(ctx, 'Invalid email or password.');
  }

  const token = jwt.sign(user, SECRET_KEY, {
    expiresIn: 60 * 60 * 24 * 30, // 60s * 60m * 24h * 30d
  });
  ctx.body = { token };

  return undefined;
};
