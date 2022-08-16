import { sign, verify } from "jsonwebtoken";

export interface TokenServiceConstructor {
  token: string;
}

class TokenService {
  public readonly token?: string;
  private readonly privateKey: string;

  constructor(params?: TokenServiceConstructor) {
    // deconstruct the token from params.
    const { token } = params ?? {};

    // Initalize token in the class if it exist
    this.token = token ?? "";
    this.privateKey = process.env.PRIVATE_JWT_KEY as string;
  }

  createToken = async (tokenPayload: string | Buffer | object) => {
    // Create new token with token payload.
    const newToken = sign(tokenPayload, this.privateKey, {
      issuer: process.env.JWT_ISSUER_ID,
    });

    // If the token doesn't generate return false.
    if (!newToken) {
      return false;
    }

    return {
      tokenData: tokenPayload,
      token: newToken,
    };
  };

  verifyString = async <T = any>(): Promise<T | { error: any }> => {
    // Check the token has been passed in.
    if (!this.token) {
      return { error: false };
    }

    // Attempt to verify the payload.
    try {
      // Verify the token is legit.
      const tokenPayload = verify(this.token, this.privateKey, {
        issuer: process.env.JWT_ISSUER_ID,
      }) as T;

      // return token payload.
      return tokenPayload;
    } catch (error) {
      return {
        error,
      };
    }
  };
}

export default TokenService;
