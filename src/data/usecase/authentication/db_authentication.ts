import { Authentication, AuthenticationModel } from '../../../domain/usecase/authentication'
import { HashedComparer } from '../../protocols/cryptograph/hashed_comparer'
import { LoadAccountByEmailRepository } from '../../protocols/db/load_account_by_email_repository'

export class DbAuthentication implements Authentication {
  constructor(private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository, private readonly hashedComparer: HashedComparer) { }
  async auth(authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email)

    if (account) {
      await this.hashedComparer.compare(authentication.password, account.password)
    }

    return null
  }
}
