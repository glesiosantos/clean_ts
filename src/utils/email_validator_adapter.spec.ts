import { EmailValidatorAdapter } from './email_validator_adapter'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail(): boolean {
    return true
  }
}))

describe('Email Validator Adapter', () => {
  it('should return false when EmailValidator return false', () => {
    const sut = new EmailValidatorAdapter()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid_emaill@mail.com')
    expect(isValid).toBe(false)
  })

  it('should return true when EmailValidator return true', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('any_emaill@mail.com')
    expect(isValid).toBe(true)
  })
})
