import { InvalidParamError } from '../../errors'
import { ComparedFieldValidation } from './compared_fields_validation'
import { Validation } from './validation'

const makeSut = (): Validation => {
  const sut = new ComparedFieldValidation('field', 'fieldCompared')

  return sut
}

describe('Compared Fields Validaton', () => {
  it('should return an error when password confirmation fails', () => {
    const sut = makeSut()
    const result = sut.validate({ field: 'any_value', fieldCompared: 'wrong_value' })
    expect(result).toEqual(new InvalidParamError('fieldCompared'))
  })

  it('should return null when password confirmation on success', () => {
    const sut = makeSut()
    const result = sut.validate({ field: 'any_value', fieldCompared: 'any_value' })
    expect(result).toBeFalsy()
  })
})
