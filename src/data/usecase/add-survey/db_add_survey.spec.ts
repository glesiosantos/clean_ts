import { DBAddSurvey } from './db_add_survey'
import { AddSurveyModel, AddSurveyRepository } from './add_survey_protocols'

type SutTypes = {
  sut: DBAddSurvey
  addAccountRepositoryStub: AddSurveyRepository
}

const makeFakeSurveyData = (): AddSurveyModel => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }]
})

const makeAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add (surveyData: AddSurveyModel): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }

  return new AddSurveyRepositoryStub()
}

const makeSut = (): SutTypes => {
  const addAccountRepositoryStub = makeAddSurveyRepository()
  const sut = new DBAddSurvey(addAccountRepositoryStub)
  return { sut, addAccountRepositoryStub }
}

describe('DB Add Survey UseCase', () => {
  it('should calls AddSurveyRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    await sut.add(makeFakeSurveyData())
    expect(addSpy).toHaveBeenCalledWith(makeFakeSurveyData())
  })
})
