import { AccessDeneidError } from '../errors'
import { forbidden, ok, serverError } from '../helpers/http/http_helper'
import { HttpRequest, HttpResponse, LoadAccountByToken, Middleware } from './auth_middlewares_protocols'

export class AuthMiddlewares implements Middleware {
  constructor(
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly role?: string) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['x-access-token']
      if (accessToken) {
        const account = await this.loadAccountByToken.load(accessToken, this.role)
        if (account) return ok({ accountId: account.id })
      }
      return forbidden(new AccessDeneidError())
    } catch (error) {
      return serverError(error)
    }
  }
}
