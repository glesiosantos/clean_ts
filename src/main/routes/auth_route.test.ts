import request from 'supertest'
import { MongoHelper } from '../../infra/db/helpers/mongo_helper'
import app from '../config/app'

describe('Auth Route', () => {
  beforeAll(async () => await MongoHelper.connect(process.env.MONGO_URL))

  afterAll(async () => await MongoHelper.disconnect())

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    it('should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({ name: 'Glêsio Santos', email: 'glesioss@gmail.com', password: '123456', passwordConfirmation: '123456' })
        .expect(200)
    })
  })
})
