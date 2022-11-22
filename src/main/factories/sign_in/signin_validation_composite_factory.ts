import { EmailFieldValidation, RequiredFieldValidation, Validation, ValidationComposite } from '../../../presentation/helpers/validators'
import { EmailValidator } from '../../../presentation/protocols/email_validator'

export const makeSignInValidationComposite = (emailValidator: EmailValidator): Validation => {
  const validations: Validation[] = []

  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }

  validations.push(new EmailFieldValidation('email', emailValidator))
  return new ValidationComposite(validations)
}
