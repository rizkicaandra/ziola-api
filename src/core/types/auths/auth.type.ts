export type JwtTokenPayload = {
  userAccountId: string;
  email: string;
  applicationCode: string;
};

export type UserToken = {
  token: string;
  refreshToken: string;
};
