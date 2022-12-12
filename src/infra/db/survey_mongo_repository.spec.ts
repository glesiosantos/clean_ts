import { Collection } from 'mongodb'
import { MongoHelper } from './helpers/mongo_helper'
import { SurveyMongoRepository } from './survey_mongo_repository'

const makeSut = (): SurveyMongoRepository => new SurveyMongoRepository()

describe('Survey Mongo Repository', () => {
  let surveyCollection: Collection

  beforeAll(async () => await MongoHelper.connect(process.env.MONGO_URL))

  afterAll(async () => await MongoHelper.disconnect())

  beforeEach(async () => {
    surveyCollection = MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
  })

  it('should add a survey on success', async () => {
    const sut = makeSut()
    await sut.add({
      question: 'any_question',
      answers: [{
        image: 'any_image',
        answer: 'any_answer'
      }, {
        answer: 'other_answer'
      }]
    })

    const survey = await surveyCollection.findOne({ question: 'any_question' })
    expect(survey).toBeTruthy()
  })
})
