import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http_helper'
import { AddAccount, Controller, EmailValidator, HttpRequest, HttpResponse, Validation } from './signup_protocols'

export class SignUpController implements Controller {
  constructor(private readonly emailValidator: EmailValidator, private readonly addAccount: AddAccount, private readonly validation: Validation) { }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)

      if (error) return badRequest(error)

      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { name, email, password, passwordConfirmation } = httpRequest.body

      const isValidEmail = this.emailValidator.isValid(email)

      if (!isValidEmail) return badRequest(new InvalidParamError('email'))

      if (password !== passwordConfirmation) return badRequest(new InvalidParamError('password'))

      const account = await this.addAccount.add({ name, email, password })
      return ok(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
