
import { EmailValidator } from '../../../../presentation/protocols/email_validator'
import { Validation } from '../../../../presentation/protocols/validation'
import { ComparedFieldValidation, EmailFieldValidation, RequiredFieldValidation, ValidationComposite } from '../../../../validators'

export const makeSignUpValidationComposite = (emailValidator: EmailValidator): Validation => {
  const validations: Validation[] = []

  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new ComparedFieldValidation('password', 'passwordConfirmation'))
  validations.push(new EmailFieldValidation('email', emailValidator))
  return new ValidationComposite(validations)
}
