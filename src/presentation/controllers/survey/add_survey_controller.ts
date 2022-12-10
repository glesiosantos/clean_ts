import { HttpRequest, HttpResponse } from '../../protocols'
import { badRequest, Controller, Validation } from './survey_protocols'

export class AddSurveyController implements Controller {
  constructor(private readonly validation: Validation) { }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error) return badRequest(error)
    return new Promise(resolve => resolve(null))
  }
}
