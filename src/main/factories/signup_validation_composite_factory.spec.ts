import { RequiredFieldValidation } from '../../presentation/helpers/validators/required_fields_validation'
import { Validation } from '../../presentation/helpers/validators/validation'
import { ValidationComposite } from '../../presentation/helpers/validators/validation_composite'
import { makeSignUpValidationComposite } from './sign_validation_composite_factory'

jest.mock('../../presentation/helpers/validators/validation_composite')

describe('SignUp Validation Composite Factory', () => {
  it('should calls ValidationComposite with all validations', () => {
    makeSignUpValidationComposite()

    const validations: Validation[] = []

    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
