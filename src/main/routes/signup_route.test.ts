import request from 'supertest'
import { MongoHelper } from '../../infra/db/helpers/mongo_helper'
import app from '../config/app'

describe('Sign Up Route', () => {
  beforeAll(async () => await MongoHelper.connect(process.env.MONGO_URL))

  afterAll(async () => await MongoHelper.disconnect())

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  it('should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({ name: 'Glêsio Santos', email: 'glesio.s.silva', password: '123456' })
      .expect(200)
  })
})
