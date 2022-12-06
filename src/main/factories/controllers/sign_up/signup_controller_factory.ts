import { SignUpController } from '../../../../presentation/controllers/signup/signup_controller'
import { Controller } from '../../../../presentation/protocols'
import { EmailValidatorAdapter } from '../../../adapters/validators/email_validator_adapter'
import { makeLogController } from '../../decorators/log_controller_decorator_factory'
import { makeDbAddAccount } from '../../usecases/add-account/db_add_account_factory'
import { makeDbAuthentication } from '../../usecases/authentication/db_authentication_factory'
import { makeSignUpValidationComposite } from './signup_validation_composite_factory'

export const makeSignUpController = (): Controller => {
  const emailValidator = new EmailValidatorAdapter()
  const validationCompose = makeSignUpValidationComposite(emailValidator)
  const signupController = new SignUpController(makeDbAddAccount(), validationCompose, makeDbAuthentication())
  return makeLogController(signupController)
}
