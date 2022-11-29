import { Authentication, AuthenticationModel, HashedComparer, LoadAccountByEmailRepository, Encrypter, UpdateAccessTokenRepository } from './db_authetication_protocols'

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashedComparer: HashedComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) { }

  async auth(authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authentication.email)

    if (account) {
      const isValid = await this.hashedComparer.compare(authentication.password, account.password)
      if (isValid) {
        const accessToken = await this.encrypter.generate(account.id)
        await this.updateAccessTokenRepository.updateAccessToken(account.id, accessToken)
        return accessToken
      }
    }

    return null
  }
}
