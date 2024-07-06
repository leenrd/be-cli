import { Request } from 'express';

// declare interface PublicRequest extends Request {
//   apiKey: ApiKey;
// }

// declare interface RoleRequest extends PublicRequest {
//   currentRoleCodes: string[];
// }

// declare interface ProtectedRequest extends RoleRequest {
//   user: User;
//   accessToken: string;
//   keystore: Keystore;
// }

declare interface Tokens {
  accessToken: string;
  refreshToken: string;
}
