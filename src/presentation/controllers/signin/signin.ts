import { InvalidParamError, MissingParamError, UnauthorizedError } from '../../errors'
import { badRequest, ok, serverError, unauthorized } from '../../helpers/http_helper'
import { Authentication, Controller, EmailValidator, HttpRequest, HttpResponse } from './signin_protocols'

export class SignInController implements Controller {
  constructor(private readonly emailValidator: EmailValidator, private readonly authentication: Authentication) { }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const isValid = this.emailValidator.isValid(httpRequest.body.email)

      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

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
