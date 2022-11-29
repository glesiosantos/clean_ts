import { DbAddAccount } from '../../../data/usecase/add-account/db_add_account'
import { BcryptAdapter } from '../../../infra/cryptography/bcrypt_adapter'
import { AccountMongoRepository } from '../../../infra/db/account_mongo_repository'
import { LogErrorMongoRepository } from '../../../infra/db/log_error_mongo_repository'
import { SignUpController } from '../../../presentation/controllers/signup/signup_controller'
import { Controller } from '../../../presentation/protocols'
import { EmailValidatorAdapter } from '../../../utils/email_validator_adapter'
import { LogErrorControllerDecorator } from '../../decorators/log_error_controller_decorator'
import { makeSignUpValidationComposite } from './signup_validation_composite_factory'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const addAccountRepository = new AccountMongoRepository()
  const encrypter = new BcryptAdapter(salt)
  const addAccount = new DbAddAccount(encrypter, addAccountRepository)
  const emailValidator = new EmailValidatorAdapter()
  const validationCompose = makeSignUpValidationComposite(emailValidator)
  const signupController = new SignUpController(addAccount, validationCompose)
  const logErrorMongoRepository = new LogErrorMongoRepository()
  return new LogErrorControllerDecorator(signupController, logErrorMongoRepository)
}
