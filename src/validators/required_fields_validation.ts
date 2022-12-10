import { MissingParamError } from '../presentation/errors'
import { Validation } from '../presentation/protocols/validation'

export class RequiredFieldValidation implements Validation {
  constructor(private readonly fiedldName: string) { }
  validate (input: any): Error {
    if (!input[this.fiedldName]) {
      return new MissingParamError(this.fiedldName)
    }
  }
}
