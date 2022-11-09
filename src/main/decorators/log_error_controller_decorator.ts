import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'

export class LogErrorControllerDecorator implements Controller {
  constructor(private readonly controller: Controller) { }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)
    return httpResponse
  }
}
