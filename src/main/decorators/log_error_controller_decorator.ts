import { LogErrorRepository } from '../../data/protocols/db/log/log_error_repository'
import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'

export class LogErrorControllerDecorator implements Controller {
  constructor(private readonly controller: Controller, private readonly logErrorRepository: LogErrorRepository) { }
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)
    if (httpResponse.statusCode === 500) await this.logErrorRepository.log(httpResponse.body.stack)
    return httpResponse
  }
}
