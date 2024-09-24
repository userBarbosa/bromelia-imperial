'use strict';

export type LoginUserResponse = {
  data: {
    id?: string;
    name?: string;
    email?: string;
    groups?: string[];
    token: string;
    expiresIn: number;
  };
  success: boolean;
};

export enum LOCAL_STORAGE_STRINGS {
  JWT = 'token',
  EXPIRATION = 'expires_at',
}
