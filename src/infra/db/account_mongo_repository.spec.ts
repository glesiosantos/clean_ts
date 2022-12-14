import { Collection } from 'mongodb'
import { AccountMongoRepository } from './account_mongo_repository'
import { MongoHelper } from './helpers/mongo_helper'

const makeSut = (): AccountMongoRepository => new AccountMongoRepository()

describe('Account Mongo Repository', () => {
  let accountCollection: Collection

  beforeAll(async () => await MongoHelper.connect(process.env.MONGO_URL))

  afterAll(async () => await MongoHelper.disconnect())

  beforeEach(async () => {
    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  it('should return an account on add success', async () => {
    const sut = makeSut()
    const account = await sut.add({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'hashed_password'
    })

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
  })

  it('should return an account on loadByEmail success', async () => {
    const sut = makeSut()

    // para ter um registro no banco
    await accountCollection.insertOne({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'hashed_password'
    })

    const account = await sut.loadByEmail('any_email@mail.com')

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
  })

  it('should return null when loadByEmail fails', async () => {
    const sut = makeSut()
    const account = await sut.loadByEmail('any_email@mail.com')
    expect(account).toBeFalsy()
  })

  it('should update the account accessToken on updateAccessToken success', async () => {
    const sut = makeSut()

    const accountId = await accountCollection.insertOne({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'hashed_password'
    })
    const accountDb = await accountCollection.findOne({ _id: accountId.insertedId })

    expect(accountDb.accessToken).toBeFalsy() // garantindo que não exista o access token
    // autalizando as informa na base
    await sut.updateAccessToken(accountId.insertedId.toHexString(), 'any_token')

    const account = await accountCollection.findOne({ _id: accountId.insertedId })
    console.log('***************************************', account)
    // garantindo que foi atualizado
    expect(account).toBeTruthy()
    expect(account.accessToken).toBe('any_token')
  })
})
