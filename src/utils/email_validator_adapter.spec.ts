import { EmailValidatorAdapter } from './email_validator_adapter'

describe('Email Validator Adapter', () => {
  it('should return false when EmailValidator return false', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('any_emaill@mail.com')
    expect(isValid).toBeFalsy()
  })
})
