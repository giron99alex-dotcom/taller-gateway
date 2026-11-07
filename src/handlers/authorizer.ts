import type {
  APIGatewayTokenAuthorizerHandler,
} from "aws-lambda";
import { verifyAccessToken } from "../lib/jwt";

export const authorizer: APIGatewayTokenAuthorizerHandler = async (event) => {
  const token = event.authorizationToken.replace(/^Bearer\s+/i, "");

  try {
    const payload = verifyAccessToken(token);

    return {
      principalId: payload.userId,
      policyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Action: "execute-api:Invoke",
            Effect: "Allow",
            Resource: event.methodArn,
          },
        ],
      },
      context: {
        userId: payload.userId,
        role: payload.role,
      },
    };
  } catch {
    throw new Error("Unauthorized");
  }
};