import { DbAuthentication } from '../../../../data/usecase/authentication/db_authentication'
import { Authentication } from '../../../../domain/usecase/authentication'
import { BcryptAdapter } from '../../../../infra/cryptography/bcrypt_adapter'
import { JwtAdapter } from '../../../../infra/cryptography/jwt_adapter'
import { AccountMongoRepository } from '../../../../infra/db/account_mongo_repository'
import env from '../../../config/env'

export const makeDbAuthentication = (): Authentication => {
  const encrypter = new JwtAdapter(env.jwtSecret)
  const bcryptAdapter = new BcryptAdapter(12)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbAuthentication(accountMongoRepository, bcryptAdapter, encrypter, accountMongoRepository)
}
