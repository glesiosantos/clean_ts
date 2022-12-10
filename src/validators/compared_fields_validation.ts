import { InvalidParamError } from '../presentation/errors'
import { Validation } from '../presentation/protocols/validation'

export class ComparedFieldValidation implements Validation {
  constructor(private readonly fiedldName: string, private readonly fieldToCompared: string) { }
  validate(input: any): Error {
    if (input[this.fiedldName] !== input[this.fieldToCompared]) return new InvalidParamError(this.fieldToCompared)
  }
}
