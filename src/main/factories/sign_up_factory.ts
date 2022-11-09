import { DbAddAccount } from '../../data/usecase/add-account/db_add_account'
import { BcryptAdapter } from '../../infra/cryptography/bcrypt_adapter'
import { AccountMongoRepository } from '../../infra/db/account_mongo_repository'
import { SignUpController } from '../../presentation/controllers/signup/signup_controller'
import { Controller } from '../../presentation/protocols'
import { EmailValidatorAdapter } from '../../utils/email_validator_adapter'
import { LogErrorControllerDecorator } from '../decorators/log_error_controller_decorator'

export const makeSignUpController = (): Controller => {
  const addAccountRepository = new AccountMongoRepository()
  const encrypter = new BcryptAdapter()
  const addAccount = new DbAddAccount(encrypter, addAccountRepository)
  const emailValidator = new EmailValidatorAdapter()
  const signupController = new SignUpController(emailValidator, addAccount)
  return new LogErrorControllerDecorator(signupController)
}
