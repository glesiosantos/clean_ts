import { SignInController } from '../../../../presentation/controllers/signin/signin_controller'
import { Controller } from '../../../../presentation/protocols'
import { EmailValidatorAdapter } from '../../../adapters/validators/email_validator_adapter'
import { makeLogController } from '../../decorators/log_controller_decorator_factory'
import { makeDbAuthentication } from '../../usecases/authentication/db_authentication_factory'
import { makeSignInValidationComposite } from './signin_validation_composite_factory'

export const makeSignInController = (): Controller => {
  const signInController = new SignInController(makeDbAuthentication(), makeSignInValidationComposite(new EmailValidatorAdapter()))
  return makeLogController(signInController)
}
