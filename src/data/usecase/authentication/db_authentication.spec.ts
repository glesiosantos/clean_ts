import { LoadAccountByEmailRepository } from '../../protocols/load_account_by_email_repository'
import { AccountModel } from '../add-account/db_add_account_protocols'
import { DbAuthentication } from './db_authentication'

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com.br',
  password: 'hashed_password'
})

describe('DB Authentication UseCase', () => {
  it('should calls LoadAccountByEmailRepository with correct email', async () => {
    class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
      async load(email: string): Promise<AccountModel> {
        return new Promise(resolve => resolve(makeFakeAccount()))
      }
    }

    const loadAccountByEmailRepositoryStub = new LoadAccountByEmailRepositoryStub()
    const sut = new DbAuthentication(loadAccountByEmailRepositoryStub)
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
    await sut.auth({ email: 'any_email@mail.com', password: 'any_password' })
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
