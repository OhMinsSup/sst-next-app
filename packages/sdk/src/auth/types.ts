import type { FetchOptions } from "ofetch";

import type { UserExternalPayload } from "@thread/db/selectors";

import type {
  $FetchOptions,
  CoreClientBuilderConstructorOptions,
  CoreClientResponse,
} from "../core/types";
import type {
  FormFieldRefreshTokenSchema,
  FormFieldSignInSchema,
  FormFieldSignUpSchema,
} from "./auth.schema";

// auth.client.ts -----------------------------------

export type AuthClientConstructorOptions = CoreClientBuilderConstructorOptions;

export type FnNameKey = "signUp" | "signIn" | "refresh";

// auth.builder.ts -----------------------------------

export type AuthBuilderInput<Fn extends FnNameKey> = Fn extends "signUp"
  ? FormFieldSignUpSchema
  : Fn extends "signIn"
    ? FormFieldSignInSchema
    : Fn extends "refresh"
      ? FormFieldRefreshTokenSchema
      : FetchOptions["body"];

export type AuthBuilderReturnValue<Fn extends FnNameKey> = CoreClientResponse<
  Fn extends "signUp"
    ? SignupResponse
    : Fn extends "signIn"
      ? SigninResponse
      : Fn extends "refresh"
        ? TokenResponse
        : unknown
>;

export type AuthBuilderConstructorOptions<FnKey extends FnNameKey> =
  AuthClientConstructorOptions & {
    /**
     * Function key.
     * @description fnKey는 함수 이름을 나타냅니다. (rpc 함수 이름)
     */
    $fnKey: FnKey;
    /**
     * Fetch options.
     * @description $fetchOptions는 ofetch의 FetchOptions와 동일합니다.
     */
    $fetchOptions?: $FetchOptions;
  };

export type RpcOptions<FnKey extends FnNameKey> = Partial<
  Pick<AuthBuilderConstructorOptions<FnKey>, "$fetchOptions">
>;

// auth response types -----------------------------------

interface TokenItemSchema {
  token: string;
  expiresAt: Date;
}

export interface TokenResponse {
  accessToken: TokenItemSchema;
  refreshToken: TokenItemSchema;
}

export interface SignupResponse {
  tokens: TokenResponse;
}

export interface SigninResponse {
  user: UserExternalPayload;
  tokens: TokenResponse;
}
