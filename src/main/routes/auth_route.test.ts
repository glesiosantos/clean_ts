import { hash } from 'bcrypt'
import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/helpers/mongo_helper'
import app from '../config/app'

describe('Auth Route', () => {
  let accountCollection: Collection

  beforeAll(async () => await MongoHelper.connect(process.env.MONGO_URL))

  afterAll(async () => await MongoHelper.disconnect())

  beforeEach(async () => {
    accountCollection = MongoHelper.getCollection('accounts')
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

  describe('POST /signin', () => {
    it('should return 200 on signin', async () => {
      const password = await hash('123456', 12)

      await await accountCollection.insertOne({
        name: 'Glêsio Santos',
        email: 'glesioss@gmail.com',
        password
      })

      await request(app)
        .post('/api/signin')
        .send({ email: 'glesioss@gmail.com', password: '123456' })
        .expect(200)
    })
  })
})
