import { InvalidParamError } from '../errors/invalid_param_error'
import { MissingParamError } from '../errors/missing_param_error'
import { ServerError } from '../errors/server_error'
import { badRequest, serverError } from '../helpers/http_helper'
import { Controller } from '../protocols/controller'
import { EmailValidator } from '../protocols/email_validator'
import { HttpRequest, HttpResponse } from '../protocols/http'

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
    } catch (error) {
      return serverError(new ServerError())
    }
  }
}
