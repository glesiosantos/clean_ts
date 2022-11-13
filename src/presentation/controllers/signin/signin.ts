import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http_helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class SignInController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return badRequest(new MissingParamError('email'))
  }
}
