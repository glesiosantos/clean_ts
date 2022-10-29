import { InvalidParamError, MissingParamError, ServerError } from '../errors'
import { badRequest, serverError } from '../helpers/http_helper'
import { Controller, EmailValidator, HttpRequest, HttpResponse } from '../protocols'

export class SignUpController implements Controller {
  constructor(private readonly emailValidator: EmailValidator) { }
  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const isValidEmail = this.emailValidator.isValid(httpRequest.body.email)

      if (!isValidEmail) return badRequest(new InvalidParamError('email'))

      if (httpRequest.body.password !== httpRequest.body.passwordConfirmation) return badRequest(new InvalidParamError('password'))
    } catch (error) {
      return serverError(new ServerError())
    }
  }
}
