import type { $Fetch } from "ofetch";
import { joinURL } from "ufo";

import { HttpStatus } from "@thread/enum/http-status";
import { createError } from "@thread/error/http";

import type { $FetchOptions, $Url, CoreClientResponse } from "../core/types";
import type {
  FnNameKey,
  GetMeResponse,
  UsersBuilderConstructorOptions,
  UsersBuilderInput,
} from "./types";

export default class UsersBuilder<FnKey extends FnNameKey = FnNameKey> {
  private $fnKey: FnKey;

  private $url: $Url;

  private $fetch: $Fetch;

  private $fetchOptions?: $FetchOptions;

  private _endpoints = {
    root: "/users",
  };

  constructor({
    $fnKey,
    $fetch,
    $url,
    $fetchOptions,
  }: UsersBuilderConstructorOptions<FnKey>) {
    this.$fnKey = $fnKey;
    this.$fetch = $fetch;
    this.$url = $url;
    this.$fetchOptions = $fetchOptions;
  }

  async call(input?: UsersBuilderInput<FnKey>) {
    const key = this.$fnKey;
    const isFnExist = key in this;
    if (!isFnExist) {
      throw createError({
        message: "Invalid function",
        status: HttpStatus.BAD_REQUEST,
      });
    }

    return await this.getMe();
  }

  /**
   * @public
   * @description 회원가입
   */
  protected async getMe() {
    const requestUrl = joinURL(this.$url, this._endpoints.root);

    return await this.$fetch<CoreClientResponse<GetMeResponse>, "json">(
      requestUrl,
      {
        ...(this.$fetchOptions ?? {}),
        method: "GET",
      },
    );
  }
}