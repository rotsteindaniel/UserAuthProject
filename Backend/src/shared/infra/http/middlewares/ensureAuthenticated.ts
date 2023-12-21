import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "@shared/errors/ApiError";

import { verify } from "jsonwebtoken";
import auth from "@config/auth";

interface IPayload {
  subject: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new UnauthorizedError("Invalid token!");
  }

  const [, token] = authHeader.split(" ");

  try {
    const decodedToken = verify(token, auth.secret_token) as IPayload;

    const user_id = decodedToken.subject;

    request.user = {
      id: user_id,
    };

    next();
  } catch {
    throw new UnauthorizedError("Invalid token!");
  }
}
