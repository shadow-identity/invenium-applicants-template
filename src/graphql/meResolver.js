import jsonwebtoken from 'jsonwebtoken';

import { JWT_SECRET } from '../constants';

export default function meResolver(parent, args, context) {
  if (args.token || context.req.headers.authorization) {
    const token = args.token || context.req.headers.authorization;
    const _token = token.replace(/^Bearer /gm, '');
    return jsonwebtoken.decode(_token, JWT_SECRET);
  }
  return undefined;
}
