import { DbAddAccount } from '../../data/usecase/add-account/db_add_account'
import { BcryptAdapter } from '../../infra/cryptography/bcrypt_adapter'
import { AccountMongoRepository } from '../../infra/db/account_mongo_repository'
import { SignUpController } from '../../presentation/controllers/signup/signup_controller'
import { EmailValidatorAdapter } from '../../utils/email_validator_adapter'

export const makeSignUpController = (): SignUpController => {
  const addAccountRepository = new AccountMongoRepository()
  const encrypter = new BcryptAdapter()
  const addAccount = new DbAddAccount(encrypter, addAccountRepository)
  const emailValidator = new EmailValidatorAdapter()
  const signupController = new SignUpController(emailValidator, addAccount)
  return signupController
}
