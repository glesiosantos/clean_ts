import { MissingParamError } from '../../errors'
import { Validation } from './validation'

export class RequiredFieldValidation implements Validation {
  constructor(private readonly fiedldName: string) { }
  validate(input: any): Error {
    if (!input[this.fiedldName]) return new MissingParamError(this.fiedldName)
  }
}
