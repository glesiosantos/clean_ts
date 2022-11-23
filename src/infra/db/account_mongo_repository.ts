import { AddAccountRepository } from '../../data/protocols/db/add_account_repository'
import { AccountModel } from '../../domain/models/account_model'
import { AddAccountModel } from '../../domain/usecase/add_account'
import { MongoHelper } from './helpers/mongo_helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const collection = await accountCollection.findOne({ _id: result.insertedId })
    return MongoHelper.map(collection)
  }
}
