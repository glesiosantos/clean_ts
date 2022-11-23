import { InvalidParamError } from '../../errors'
import { EmailValidator } from '../../protocols/email_validator'
import { Validation } from '../../protocols/validation'

export class EmailFieldValidation implements Validation {
  constructor(private readonly fiedldName: string, private readonly emailValidator: EmailValidator) { }
  validate(input: any): Error {
    const isValid = this.emailValidator.isValid(input[this.fiedldName])
    if (!isValid) return new InvalidParamError(this.fiedldName)
  }
}
