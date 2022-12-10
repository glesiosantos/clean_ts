import { HttpRequest, HttpResponse } from '../../protocols'
import { Controller, Validation } from './survey_protocols'

export class AddSurveyController implements Controller {
  constructor(private readonly validation: Validation) { }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    this.validation.validate(httpRequest.body)
    return new Promise(resolve => resolve(null))
  }
}
