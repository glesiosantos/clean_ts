import { EmailFieldValidation, RequiredFieldValidation, ValidationComposite } from '../../../../presentation/helpers/validators'
import { EmailValidator } from '../../../../presentation/protocols/email_validator'
import { Validation } from '../../../../presentation/protocols/validation'
import { makeSignInValidationComposite } from './signin_validation_composite_factory'

jest.mock('../../../../presentation/helpers/validators/validation_composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

describe('SignUp Validation Composite Factory', () => {
  it('should calls ValidationComposite with all validations', () => {
    const emailValidatorStub = makeEmailValidator()
    makeSignInValidationComposite(emailValidatorStub)

    const validations: Validation[] = []

    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailFieldValidation('email', emailValidatorStub))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
