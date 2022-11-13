import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http_helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { EmailValidator } from '../signup/signup_protocols'

export class SignInController implements Controller {
  constructor(private readonly emailValidator: EmailValidator) { }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['email', 'password']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return new Promise(resolve => resolve(badRequest(new MissingParamError(field))))
      }
    }
    this.emailValidator.isValid(httpRequest.body.email)
  }
}
