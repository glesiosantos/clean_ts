import { InvalidParamError } from '../../errors'
import { ComparedFieldValidation } from './compared_fields_validation'
import { Validation } from './validation'

type SutTypes = {
  sut: Validation
}

const makeSut = (): SutTypes => {
  const sut = new ComparedFieldValidation('password', 'passwordConfirmation')

  return { sut }
}

describe('Compared Fields Validaton', () => {
  it('should return an error when password confirmation fails', () => {
    const { sut } = makeSut()
    jest.spyOn(sut, 'validate').mockReturnValueOnce(new InvalidParamError('password'))
    const httpResponse = sut.validate({ email: 'any_email@mail.com' })
    expect(httpResponse).toEqual(new InvalidParamError('password'))
  })

  it('should return null when password confirmation on success', () => {
    const { sut } = makeSut()
    const httpResponse = sut.validate({ email: 'any_email@mail.com' })
    expect(httpResponse).toBeFalsy()
  })
})
