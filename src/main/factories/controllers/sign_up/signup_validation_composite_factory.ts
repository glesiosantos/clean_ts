import { ComparedFieldValidation, EmailFieldValidation, RequiredFieldValidation, ValidationComposite } from '../../../../presentation/helpers/validators'
import { EmailValidator } from '../../../../presentation/protocols/email_validator'
import { Validation } from '../../../../presentation/protocols/validation'

export const makeSignUpValidationComposite = (emailValidator: EmailValidator): Validation => {
  const validations: Validation[] = []

  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new ComparedFieldValidation('password', 'passwordConfirmation'))
  validations.push(new EmailFieldValidation('email', emailValidator))
  return new ValidationComposite(validations)
}
