import { Request, Response, NextFunction } from "express";

export const verifyBasicAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return res.status(401).json({ message: "Missing or invalid Basic Auth credentials" });
  }

  const base64Credentials = authHeader.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString("ascii");
  const [username, password] = credentials.split(":");

  const validUser = process.env.BASIC_AUTH_USER;
  const validPass = process.env.BASIC_AUTH_PASS;

  if (username === validUser && password === validPass) {
    return next();
  }

  return res.status(401).json({ message: "Unauthorized - invalid credentials" });
};
