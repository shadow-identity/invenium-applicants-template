import jsonwebtoken from 'jsonwebtoken';

import { JWT_SECRET } from '../constants';

export default function loginResolver(parent, args, context) {
  if (args.username && args.password) {
    return {
      token: jsonwebtoken.sign({ username: args.username }, JWT_SECRET),
    };
  }
  return undefined;
}
