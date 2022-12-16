import { LoadAccountByToken } from '../../domain/usecase/load_account_by_token'
import { AccessDeneidError } from '../errors'
import { forbidden, ok, serverError } from '../helpers/http/http_helper'
import { HttpRequest, HttpResponse } from '../protocols'
import { Middleware } from '../protocols/middlewares'

export class AuthMiddlewares implements Middleware {
  constructor(private readonly loadAccountByToken: LoadAccountByToken) { }
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['x-access-token']
      if (accessToken) {
        const account = await this.loadAccountByToken.load(accessToken)
        if (account) return ok({ accountId: account.id })
      }
      return forbidden(new AccessDeneidError())
    } catch (error) {
      return serverError(error)
    }
  }
}
