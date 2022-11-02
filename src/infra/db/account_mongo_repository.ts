import { AddAccountRepository } from '../../data/protocols/add_account_repository'
import { AccountModel } from '../../domain/models/account_model'
import { AddAccountModel } from '../../domain/usecase/add_account'
import { MongoHelper } from './helpers/mongo_helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const { _id, accountWithouId } = await accountCollection.findOne({ _id: result.insertedId })
    return Object.assign({}, accountWithouId, { id: _id })
  }
}
