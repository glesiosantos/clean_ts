import { Authentication } from '../../../domain/usecase/authentication'
import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, serverError } from '../../helpers/http_helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { EmailValidator } from '../signup/signup_protocols'

export class SignInController implements Controller {
  constructor(private readonly emailValidator: EmailValidator, private readonly authentication: Authentication) { }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return new Promise(resolve => resolve(badRequest(new MissingParamError(field))))
        }
      }
      const isValid = this.emailValidator.isValid(httpRequest.body.email)

      if (!isValid) {
        return new Promise(resolve => resolve(badRequest(new InvalidParamError('email'))))
      }

      const { email, password } = httpRequest.body

      await this.authentication.auth(email, password)
    } catch (error) {
      return serverError(error)
    }
  }
}
