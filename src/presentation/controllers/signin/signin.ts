import { UnauthorizedError } from '../../errors'
import { badRequest, ok, serverError, unauthorized } from '../../helpers/http/http_helper'
import { Authentication, Controller, HttpRequest, HttpResponse, Validation } from './signin_protocols'

export class SignInController implements Controller {
  constructor(private readonly authentication: Authentication, private readonly validation: Validation) { }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)

      if (error) { return badRequest(error) }
      const { email, password } = httpRequest.body

      const accessToken = await this.authentication.auth(email, password)

      if (!accessToken) {
        return unauthorized(new UnauthorizedError())
      }

      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
