import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const [, token] = authHeader.split(' ');
    if (token) {
      const decoded = await promisify(jwt.verify)(token, authConfig.secret);

      req.userId = decoded.id;
      req.userAdmin = decoded.admin;
    }
  }

  return next();
};
