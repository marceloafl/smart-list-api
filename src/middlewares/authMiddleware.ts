import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET_KEY;

if (!secretKey) {
  throw new Error("JWT_SECRET_KEY is not defined in the environment variables");
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token not provided." });
  }
  try {
    jwt.verify(token, secretKey);
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Invalid token." });
  }
};
