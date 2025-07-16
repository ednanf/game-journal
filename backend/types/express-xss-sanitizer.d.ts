// backend/src/express-xss-sanitizer.d.ts
declare module 'express-xss-sanitizer' {
  import { RequestHandler } from 'express';
  const xss: () => RequestHandler;
  export default xss;
}
