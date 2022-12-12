import { Validation } from '../../../../presentation/protocols/validation'
import { RequiredFieldValidation, ValidationComposite } from '../../../../validators'

export const makeAddSurveyValidationComposite = (): Validation => {
  const validations: Validation[] = []

  for (const field of ['question', 'answers']) {
    validations.push(new RequiredFieldValidation(field))
  }

  return new ValidationComposite(validations)
}
