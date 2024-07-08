import { JwtPayload } from 'src/auth/jwt-payload.interface';

declare module 'express' {
  interface Request {
    user?: JwtPayload; // Объявляем, что у Request может быть свойство user типа JwtPayload
  }
}
