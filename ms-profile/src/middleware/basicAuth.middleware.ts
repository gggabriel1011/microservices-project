import { Request, Response, NextFunction } from "express";

/**
 * Basic Authentication Middleware on incoming requests.
 * Expects a base64-encoded "Authorization" header in the format: Basic <base64(username:password)>
 */
export const verifyBasicAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  // Check if the Authorization header exists and uses the Basic scheme
  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return res.status(401).json({ message: "Missing or invalid Basic Auth credentials" });
  }

  // Decode base64 credentials
  const base64Credentials = authHeader.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString("ascii");
  const [username, password] = credentials.split(":");

  // Compare credentials with environment variables
  const validUser = process.env.BASIC_AUTH_USER;
  const validPass = process.env.BASIC_AUTH_PASS;

  if (username === validUser && password === validPass) {
    return next(); // Auth successful, continue to the next middleware
  }

  // Auth failed
  return res.status(401).json({ message: "Unauthorized - invalid credentials" });
};
