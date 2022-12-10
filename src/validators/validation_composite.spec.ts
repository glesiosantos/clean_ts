import { MissingParamError } from '../presentation/errors'
import { Validation } from '../presentation/protocols/validation'
import { ValidationComposite } from './validation_composite'

type SutTypes = {
  sut: Validation
  validationStubs: Validation[]
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): Error | null {
      return null
    }
  }

  return new ValidationStub()
}

const makeSut = (): SutTypes => {
  const validationStubs = [makeValidation(), makeValidation()]
  const sut = new ValidationComposite(validationStubs)
  return { sut, validationStubs }
}

describe('Vaidation Composite', () => {
  it('should return an error when any validation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissingParamError('field'))
  })

  it('should return the first error when the one validation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new Error())
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new Error())
  })

  it('should not return when validation succeeds', () => {
    const { sut } = makeSut()
    const error = sut.validate({ field: 'any_value' })
    expect(error).toBeFalsy()
  })
})
