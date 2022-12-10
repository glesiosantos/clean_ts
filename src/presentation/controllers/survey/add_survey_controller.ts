import { HttpRequest, HttpResponse } from '../../protocols'
import { AddSurvey, badRequest, Controller, noContent, serverError, Validation } from './survey_protocols'

export class AddSurveyController implements Controller {
  constructor(private readonly validation: Validation, private readonly addSurvey: AddSurvey) { }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) return badRequest(error)
      await this.addSurvey.add(httpRequest.body)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
