import { ObjectId } from 'mongodb'
import { AddAccountRepository } from '../../data/protocols/db/account/add_account_repository'
import { LoadAccountByEmailRepository } from '../../data/protocols/db/account/load_account_by_email_repository'
import { UpdateAccessTokenRepository } from '../../data/protocols/db/account/update_access_token_repository'
import { AccountModel } from '../../domain/models/account_model'
import { AddAccountModel } from '../../domain/usecase/add_account'
import { MongoHelper } from './helpers/mongo_helper'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository {
  async updateAccessToken (id: string, token: string): Promise<void> {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.updateOne({ _id: new ObjectId(id) }, { $set: { accessToken: token } })
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.findOne({ email })
    return result && MongoHelper.map(result)
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const collection = await accountCollection.findOne({ _id: result.insertedId })
    return MongoHelper.map(collection)
  }
}
