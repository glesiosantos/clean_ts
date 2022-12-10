import { LogErrorMongoRepository } from '../../../infra/db/log_error_mongo_repository'
import { Controller } from '../../../presentation/protocols'
import { LogErrorControllerDecorator } from '../../decorators/log_error_controller_decorator'

export const makeLogController = (controller: Controller): Controller => {
  const logErrorMongoRepository = new LogErrorMongoRepository()
  return new LogErrorControllerDecorator(controller, logErrorMongoRepository)
}
