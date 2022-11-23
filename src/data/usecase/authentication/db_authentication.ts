import { Authentication, AuthenticationModel } from '../../../domain/usecase/authentication'
import { HashedComparer } from '../../protocols/cryptograph/hashed_comparer'
import { TokenGenerator } from '../../protocols/cryptograph/token_generator'
import { LoadAccountByEmailRepository } from '../../protocols/db/load_account_by_email_repository'
import { UpdateAccessTokenRepository } from '../../protocols/db/update_access_token_repository'

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashedComparer: HashedComparer,
    private readonly tokenGenerator: TokenGenerator,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) { }

  async auth(authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email)

    if (account) {
      const isValid = await this.hashedComparer.compare(authentication.password, account.password)
      if (isValid) {
        const accessToken = await this.tokenGenerator.generate(account.id)
        await this.updateAccessTokenRepository.update(account.id, accessToken)
        return accessToken
      }
    }

    return null
  }
}
