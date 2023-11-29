import { IUser } from '@modules/user/interfaces';

export interface IMessageResponse {
  message: string;
}

export interface JWTPayload {
  email: string;
}

export type IGenerateTokenProps = JWTPayload;
export interface IGetUserAuthInfoRequest extends Request {
  user: IUser;
}
