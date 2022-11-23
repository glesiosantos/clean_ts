import { Authentication, AuthenticationModel } from '../../../domain/usecase/authentication'
import { LoadAccountByEmailRepository } from '../../protocols/db/load_account_by_email_repository'

export class DbAuthentication implements Authentication {
  constructor(private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository) { }
  async auth(authentication: AuthenticationModel): Promise<string> {
    await this.loadAccountByEmailRepository.load(authentication.email)
    return null
  }
}
