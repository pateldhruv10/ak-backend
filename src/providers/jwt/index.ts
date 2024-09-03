// NPM Imports
import { sign, verify } from "jsonwebtoken";
import { config } from "dotenv";


config();

/**
 * Generate JSON Web Token
 * @param payload 
 * @param expires_in 
 * @returns 
 */
export const generateToken = (payload: any, expires_in?: string) => {
  let options = {};
  if (expires_in) {
    options = { expiresIn: expires_in };
  }
  return sign(payload, String(process?.env?.JWT_SECRET), options);
};

/**
 * It will verify Token
 * @param token 
 * @returns 
 */
export const verifyToken = (token: string) => {
  return verify(token, String(process?.env?.JWT_SECRET));
};
