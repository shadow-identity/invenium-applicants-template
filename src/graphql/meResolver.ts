import jsonwebtoken from 'jsonwebtoken';

import { JWT_SECRET } from '../constants';

// @ts-ignore
export default function meResolver(__, args: any, context: any) {
  if (args.token || context.req.headers.authorization) {
    const token = args.token || context.req.headers.authorization;
    const _token = token.replace(/^Bearer /gm, '');
    return jsonwebtoken.decode(_token);
  }
  return undefined;
}
