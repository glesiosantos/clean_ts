import { InvalidParamError } from '../presentation/errors'
import { EmailValidator } from '../presentation/protocols/email_validator'
import { Validation } from '../presentation/protocols/validation'

export class EmailFieldValidation implements Validation {
  constructor(private readonly fiedldName: string, private readonly emailValidator: EmailValidator) { }
  validate(input: any): Error {
    const isValid = this.emailValidator.isValid(input[this.fiedldName])
    if (!isValid) return new InvalidParamError(this.fiedldName)
  }
}
