import { ComparedFieldValidation } from '../../presentation/helpers/validators/compared_fields_validation'
import { RequiredFieldValidation } from '../../presentation/helpers/validators/required_fields_validation'
import { Validation } from '../../presentation/helpers/validators/validation'
import { ValidationComposite } from '../../presentation/helpers/validators/validation_composite'

export const makeSignUpValidationComposite = (): Validation => {
  const validations: Validation[] = []

  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new ComparedFieldValidation('password', 'passwordConfirmation'))
  return new ValidationComposite(validations)
}
