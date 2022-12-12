import { LogErrorRepository } from '../../data/protocols/db/log/log_error_repository'
import { MongoHelper } from './helpers/mongo_helper'

export class LogErrorMongoRepository implements LogErrorRepository {
  async log (stack: string): Promise<void> {
    const errorsCollection = MongoHelper.getCollection('errors')
    await errorsCollection.insertOne({ stack, date: new Date() })
  }
}
