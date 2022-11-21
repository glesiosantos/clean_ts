import { MissingParamError } from '../../errors'
import { Validation } from './validation'
import { ValidationComposite } from './validation_composite'

type SutTypes = {
  sut: Validation
  validationStub: Validation
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): Error {
      return null
    }
  }

  return new ValidationStub()
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const sut = new ValidationComposite([validationStub])
  return { sut, validationStub }
}

describe('Vaidation Composite', () => {
  it('should return an error when any validation fails', () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
