import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/helpers/mongo_helper'
import app from '../config/app'
import env from '../config/env'

describe('Surveys Route', () => {
  let surveyCollection: Collection

  beforeAll(async () => await MongoHelper.connect(env.mongoUrl))

  afterAll(async () => await MongoHelper.disconnect())

  beforeEach(async () => {
    surveyCollection = MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
  })

  describe('POST /surveys', () => {
    it('should return 204 on add survey success', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'Question',
          answers: [{
            image: 'http://image-name.com',
            answer: 'Answer 1'
          }, {
            answer: 'Answer 2'
          }]
        })
        .expect(204)
    })
  })
})
