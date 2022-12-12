import { RequiredFieldValidation, ValidationComposite } from '../../../../validators'
import { Validation } from '../../../../presentation/protocols/validation'
import { } from './make_add_survey_controller_factory'
import { makeAddSurveyValidationComposite } from './add_survey_validation_composite_factory'

jest.mock('../../../../validators/validation_composite')

describe('Add Survey Validation Composite Factory', () => {
  it('should calls ValidationComposite with all validations', () => {
    makeAddSurveyValidationComposite()
    const validations: Validation[] = []

    for (const field of ['question', 'answers']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
