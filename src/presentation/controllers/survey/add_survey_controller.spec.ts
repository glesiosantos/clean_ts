import { HttpRequest, Validation } from './survey_protocols'
import { AddSurveyController } from './add_survey_controller'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }]
  }
})

describe('Add Survey Controller', () => {
  it('should calls Validation with correct values', async () => {
    class ValidationStub implements Validation {
      validate(input: any): Error | null {
        return null
      }
    }

    const validationStub = new ValidationStub()
    const sut = new AddSurveyController(validationStub)
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })
})
