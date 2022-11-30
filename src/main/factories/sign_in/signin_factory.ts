import env from '../../config/env'
import { DbAuthentication } from '../../../data/usecase/authentication/db_authentication'
import { BcryptAdapter } from '../../../infra/cryptography/bcrypt_adapter'
import { JwtAdapter } from '../../../infra/cryptography/jwt_adapter'
import { AccountMongoRepository } from '../../../infra/db/account_mongo_repository'
import { LogErrorMongoRepository } from '../../../infra/db/log_error_mongo_repository'
import { SignInController } from '../../../presentation/controllers/signin/signin'
import { Controller } from '../../../presentation/protocols'
import { EmailValidatorAdapter } from '../../adapters/validators/email_validator_adapter'
import { LogErrorControllerDecorator } from '../../decorators/log_error_controller_decorator'
import { makeSignInValidationComposite } from './signin_validation_composite_factory'

export const makeSignInController = (): Controller => {
  const encrypter = new JwtAdapter(env.jwtSecret)
  const bcryptAdapter = new BcryptAdapter(12)
  const accountMongoRepository = new AccountMongoRepository()
  const authentication = new DbAuthentication(accountMongoRepository, bcryptAdapter, encrypter, accountMongoRepository)
  const signInController = new SignInController(authentication, makeSignInValidationComposite(new EmailValidatorAdapter()))
  const logErrorMongoRepository = new LogErrorMongoRepository()
  return new LogErrorControllerDecorator(signInController, logErrorMongoRepository)
}
