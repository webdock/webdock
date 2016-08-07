import users from '../../data/users.json';
import jwt from 'jsonwebtoken';

import { SECRET_KEY } from '../constants';

const userArray = Object.values(users);

export const authenticateRoute = ctx => {
  const { email, password } = ctx.request.body;

  const user = userArray.find(el => el.email === email && el.password === password);

  if (user) {
    const token = jwt.sign(user, SECRET_KEY, {
      expiresIn: 60 * 60 * 24 * 30, // 60s * 60m * 24h * 30d
    });

    ctx.body = { token };
  } else {
    ctx.status = 400;
    ctx.body = 'Invalid email or password.';
  }
};
