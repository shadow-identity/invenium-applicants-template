import jsonwebtoken from 'jsonwebtoken';

import { JWT_SECRET } from '../constants';

// @ts-ignore
export default function loginResolver(__, args: any) {
  if (args.username && args.password) {
    return {
      token: jsonwebtoken.sign({ username: args.username }, JWT_SECRET),
    };
  }
  return undefined;
}
