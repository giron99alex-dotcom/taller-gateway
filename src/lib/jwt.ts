import jwt from "jsonwebtoken";

export interface JWTPayload {
  userId: string;
  role: string;
}

export function verifyAccessToken(token: string): JWTPayload {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET no esta configurado.");
  return jwt.verify(token, secret) as JWTPayload;
}