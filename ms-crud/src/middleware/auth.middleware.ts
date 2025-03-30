import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extend Express's Request type to include an optional userId property
interface AuthRequest extends Request {
  userId?: string;
}

/**
 * Middleware to verify the JWT token from the Authorization header.
 * Ensures that the request is authenticated before proceeding to protected routes.
 * 
 * Expected format: Authorization: Bearer <token>
 */
export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  // Check if Authorization header exists and starts with "Bearer"
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Extract the token from the header
  const token = authHeader.split(" ")[1];

  try {
    // Verify and decode the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

    // Attach the user ID from the token to the request object
    req.userId = decoded.id;

    // Proceed to the next middleware or route
    next();
  } catch (error) {
    // If verification fails, respond with unauthorized
    return res.status(401).json({ message: "Invalid token" });
  }
};
