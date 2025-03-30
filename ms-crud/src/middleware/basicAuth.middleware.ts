import { Request, Response, NextFunction } from "express";

/**
 * Middleware to enforce Basic Authentication on incoming requests.
 * Validates credentials passed in the "Authorization" header using Basic Auth.
 * 
 * Expected format: Authorization: Basic <base64(username:password)>
 */
export const verifyBasicAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  // Ensure the Authorization header exists and uses "Basic" Auth
  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return res.status(401).json({ message: "Missing or invalid Basic Auth credentials" });
  }

  // Decode the base64-encoded credentials from the header
  const base64Credentials = authHeader.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString("ascii");

  // Split the credentials into username and password
  const [username, password] = credentials.split(":");

  // Retrieve valid credentials from environment variables
  const validUser = process.env.BASIC_AUTH_USER;
  const validPass = process.env.BASIC_AUTH_PASS;

  // Compare provided credentials with expected ones
  if (username === validUser && password === validPass) {
    return next(); // Authentication successful
  }

  // Authentication failed
  return res.status(401).json({ message: "Unauthorized - invalid credentials" });
};
