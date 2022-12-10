import { EmailValidator } from '../../../../presentation/protocols/email_validator'
import { Validation } from '../../../../presentation/protocols/validation'
import { EmailFieldValidation, RequiredFieldValidation, ValidationComposite } from '../../../../validators'

export const makeSignInValidationComposite = (emailValidator: EmailValidator): Validation => {
  const validations: Validation[] = []

  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }

  validations.push(new EmailFieldValidation('email', emailValidator))
  return new ValidationComposite(validations)
}
