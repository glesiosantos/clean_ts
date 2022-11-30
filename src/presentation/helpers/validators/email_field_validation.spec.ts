import { EmailFieldValidation } from './email_field_validation'
import { EmailValidator } from '../../protocols/email_validator'
import { InvalidParamError } from '../../errors'

type SutTypes = {
  sut: EmailFieldValidation
  emailValidatorStub: EmailValidator
}

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const sut = new EmailFieldValidation('email', emailValidatorStub)

  return { sut, emailValidatorStub }
}

describe('Email Field Validaton', () => {
  it('should return an error when EmailValidator return false', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpResponse = sut.validate({ email: 'any_email@mail.com' })
    expect(httpResponse).toEqual(new InvalidParamError('email'))
  })

  it('should calls EmailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    sut.validate({ email: 'any_email@mail.com' })
    expect(isValidSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  it('should return 500 when EmailValidator throws', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => { throw new Error() })
    expect(sut.validate).toThrow()
  })
})
