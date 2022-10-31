import { EmailValidatorAdapter } from './email_validator_adapter'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail(): boolean {
    return true
  }
}))

describe('Email Validator Adapter', () => {
  it('should return false when validator return false', () => {
    const sut = new EmailValidatorAdapter()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid_emaill@mail.com')
    expect(isValid).toBe(false)
  })

  it('should return true when validator return true', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('any_emaill@mail.com')
    expect(isValid).toBe(true)
  })

  it('should calls validator with correct email', () => {
    const sut = new EmailValidatorAdapter()
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    sut.isValid('any_emaill@mail.com')
    expect(isEmailSpy).toHaveBeenCalledWith('any_emaill@mail.com')
  })
})
