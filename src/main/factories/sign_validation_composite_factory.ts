import { ComparedFieldValidation } from '../../presentation/helpers/validators/compared_fields_validation'
import { EmailFieldValidation } from '../../presentation/helpers/validators/email_field_validation'
import { RequiredFieldValidation } from '../../presentation/helpers/validators/required_fields_validation'
import { Validation } from '../../presentation/helpers/validators/validation'
import { ValidationComposite } from '../../presentation/helpers/validators/validation_composite'
import { EmailValidator } from '../../presentation/protocols/email_validator'

export const makeSignUpValidationComposite = (emailValidator: EmailValidator): Validation => {
  const validations: Validation[] = []

  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new ComparedFieldValidation('password', 'passwordConfirmation'))
  validations.push(new EmailFieldValidation('email', emailValidator))
  return new ValidationComposite(validations)
}
