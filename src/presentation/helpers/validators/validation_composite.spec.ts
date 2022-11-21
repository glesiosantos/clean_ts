import { MissingParamError } from '../../errors'
import { Validation } from './validation'
import { ValidationComposite } from './validation_composite'

describe('Vaidation Composite', () => {
  it('should return an error when any validation fails', () => {
    class ValidationStub implements Validation {
      validate(input: any): Error {
        return new MissingParamError('field')
      }
    }

    const validationStub = new ValidationStub()

    const sut = new ValidationComposite([validationStub])
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
