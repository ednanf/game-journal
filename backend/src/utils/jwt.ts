import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import type { StringValue } from 'ms';

const createToken = (payload: string | object | Buffer) => {
  const secret = process.env.JWT_SECRET;
  const lifetime = (process.env.JWT_LIFETIME as StringValue) ?? '1h';

  if (!secret) {
    throw new Error('JWT secret is not defined');
  }

  const options: SignOptions = {
    expiresIn: lifetime,
  };

  return jwt.sign(payload, secret as Secret, options);
};

export default createToken;
