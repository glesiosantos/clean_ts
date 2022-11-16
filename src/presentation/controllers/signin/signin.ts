import { Authentication } from '../../../domain/usecase/authentication'
import { InvalidParamError, MissingParamError, UnauthorizedError } from '../../errors'
import { badRequest, serverError, unauthorized } from '../../helpers/http_helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { EmailValidator } from '../signup/signup_protocols'

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
    } catch (error) {
      return serverError(error)
    }
  }
}
