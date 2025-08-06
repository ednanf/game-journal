import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { StringValue } from 'ms';
import { JWTConfigurationError } from '../errors/index.js';

interface JwtUserPayload {
  userId: string;
}

// Creates a JSON Web Token (JWT) using the provided payload.
// It reads the JWT secret and lifetime from environment variables.
// If the secret or lifetime is not defined, it throws a JWTConfigurationError.
const createJWT = (payload: JwtUserPayload) => {
  const { JWT_SECRET: jwtSecret, JWT_LIFETIME: jwtLifetime } = process.env;

  if (!jwtSecret) {
    throw new JWTConfigurationError('JWT_SECRET is not defined in environment variables.');
  }

  if (!jwtLifetime) {
    throw new JWTConfigurationError('JWT_LIFETIME is not defined in environment variables.');
  }

  // Validate the JWT_LIFETIME format
  if (!/^\d+[smhdwy]$/.test(jwtLifetime)) {
    throw new JWTConfigurationError(
      `JWT_LIFETIME format invalid: ${jwtLifetime}. Expected format like '30d', '1h', '15m'.`,
    );
  }

  const options: SignOptions = {
    algorithm: 'HS256', // HMAC SHA-256 for signing
    expiresIn: jwtLifetime as StringValue, // Lifetime of the token, e.g., '1h', '2d'
  };

  return jwt.sign(payload, jwtSecret as Secret, options);
};

export default createJWT;
