import { InvalidParamError } from '../../errors'
import { Validation } from './validation'

export class ComparedFieldValidation implements Validation {
  constructor(private readonly fiedldName: string, private readonly fieldToCompared: string) { }
  validate(input: any): Error {
    if (input[this.fiedldName] !== input[this.fieldToCompared]) return new InvalidParamError(this.fieldToCompared)
  }
}
