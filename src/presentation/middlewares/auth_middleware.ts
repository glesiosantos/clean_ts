import { LoadAccountByToken } from '../../domain/usecase/load_account_by_token'
import { AccessDeneidError } from '../errors'
import { forbidden } from '../helpers/http/http_helper'
import { HttpRequest, HttpResponse } from '../protocols'
import { Middleware } from '../protocols/middlewares'

export class AuthMiddlewares implements Middleware {
  constructor(private readonly loadAccountByToken: LoadAccountByToken) { }
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const accessToken = httpRequest.headers?.['x-access-token']
    if (accessToken) {
      await this.loadAccountByToken.load(accessToken)
    }
    return forbidden(new AccessDeneidError())
  }
}
