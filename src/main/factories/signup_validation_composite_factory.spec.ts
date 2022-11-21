import { ComparedFieldValidation } from '../../presentation/helpers/validators/compared_fields_validation'
import { EmailFieldValidation } from '../../presentation/helpers/validators/email_field_validation'
import { RequiredFieldValidation } from '../../presentation/helpers/validators/required_fields_validation'
import { Validation } from '../../presentation/helpers/validators/validation'
import { ValidationComposite } from '../../presentation/helpers/validators/validation_composite'
import { EmailValidator } from '../../presentation/protocols/email_validator'
import { makeSignUpValidationComposite } from './sign_validation_composite_factory'

jest.mock('../../presentation/helpers/validators/validation_composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

describe('SignUp Validation Composite Factory', () => {
  it('should calls ValidationComposite with all validations', () => {
    const emailValidatorStub = makeEmailValidator()
    makeSignUpValidationComposite(emailValidatorStub)

    const validations: Validation[] = []

    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new ComparedFieldValidation('password', 'passwordConfirmation'))
    validations.push(new EmailFieldValidation('email', emailValidatorStub))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
