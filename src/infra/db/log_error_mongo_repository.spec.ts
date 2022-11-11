import { Collection } from 'mongodb'
import { MongoHelper } from './helpers/mongo_helper'
import { LogErrorMongoRepository } from './log_error_mongo_repository'

describe('Log Error Mongo Repository', () => {
  let errorsCollection: Collection

  beforeAll(async () => await MongoHelper.connect(process.env.MONGO_URL))

  afterAll(async () => await MongoHelper.disconnect())

  beforeEach(async () => {
    errorsCollection = MongoHelper.getCollection('errors')
    await errorsCollection.deleteMany({})
  })

  it('should created an error log on success', async () => {
    const sut = new LogErrorMongoRepository()
    await sut.log('any_error')
    const count = await errorsCollection.countDocuments()
    expect(count).toBe(1)
  })
})
