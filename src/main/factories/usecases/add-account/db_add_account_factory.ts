import { DbAddAccount } from '../../../../data/usecase/add-account/db_add_account'
import { AddAccount } from '../../../../data/usecase/add-account/db_add_account_protocols'
import { BcryptAdapter } from '../../../../infra/cryptography/bcrypt_adapter'
import { AccountMongoRepository } from '../../../../infra/db/account_mongo_repository'

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12
  const accountRepository = new AccountMongoRepository()
  const encrypter = new BcryptAdapter(salt)
  return new DbAddAccount(encrypter, accountRepository, accountRepository)
}
