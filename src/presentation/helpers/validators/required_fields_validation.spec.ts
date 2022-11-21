import { MissingParamError } from '../../errors'
import { RequiredFieldValidation } from './required_fields_validation'
import { Validation } from './validation'

const makeSut = (): Validation => {
  const sut = new RequiredFieldValidation('field')

  return sut
}

describe('Compared Fields Validaton', () => {
  it('should return a MissingParamError when validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ name: 'any_field' })
    expect(error).toEqual(new MissingParamError('field'))
  })

  it('should not return a MissingParamError when succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_field' })
    expect(error).toBeFalsy()
  })
})
