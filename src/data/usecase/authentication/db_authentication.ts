import { Authentication, AuthenticationModel } from '../../../domain/usecase/authentication'
import { HashedComparer } from '../../protocols/cryptograph/hashed_comparer'
import { TokenGenerator } from '../../protocols/cryptograph/token_generator'
import { LoadAccountByEmailRepository } from '../../protocols/db/load_account_by_email_repository'

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashedComparer: HashedComparer,
    private readonly tokenGenerator: TokenGenerator
  ) { }

  async auth(authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email)

    if (account) {
      await this.hashedComparer.compare(authentication.password, account.password)
      await this.tokenGenerator.generate(account.id)
    }

    return null
  }
}
