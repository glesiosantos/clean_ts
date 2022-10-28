import { MissingParamError } from '../errors/missing_param_error'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignUpController {
  handle(httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password']

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return { statusCode: 400, body: new MissingParamError(field) }
      }
    }
  }
}
