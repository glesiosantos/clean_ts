import { Authentication, AuthenticationModel } from '../../../domain/usecase/authentication'
import { HashedComparer } from '../../protocols/cryptograph/hashed_comparer'
import { LoadAccountByEmailRepository } from '../../protocols/db/load_account_by_email_repository'
import { AccountModel } from '../add-account/db_add_account_protocols'
import { DbAuthentication } from './db_authentication'

type SutType = {
  sut: Authentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  hashedComparerStub: HashedComparer
}

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com.br',
  password: 'hashed_password'
})

const makeAuthentication = (): AuthenticationModel => ({ email: 'any_email@mail.com', password: 'any_password' })

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async load(email: string): Promise<AccountModel> {
      return new Promise(resolve => resolve(makeFakeAccount()))
    }
  }

  return new LoadAccountByEmailRepositoryStub()
}

const makeHashedComparer = (): HashedComparer => {
  class HashedComparerStub implements HashedComparer {
    async compare(value: string, hashed: string): Promise<boolean> {
      return new Promise(resolve => resolve(true))
    }
  }

  return new HashedComparerStub()
}

const makeSut = (): SutType => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
  const hashedComparerStub = makeHashedComparer()
  const sut = new DbAuthentication(loadAccountByEmailRepositoryStub, hashedComparerStub)
  return { sut, loadAccountByEmailRepositoryStub, hashedComparerStub }
}

describe('DB Authentication UseCase', () => {
  it('should calls LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
    await sut.auth(makeAuthentication())
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  it('should throw when LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.auth(makeAuthentication())
    await expect(promise).rejects.toThrow()
  })

  it('should return null when LoadAccountByEmailRepository return null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'load').mockReturnValueOnce(null)
    const accessToken = await sut.auth(makeAuthentication())
    expect(accessToken).toBeNull()
  })

  it('should calls HashedComparer with correct password', async () => {
    const { sut, hashedComparerStub } = makeSut()
    const compareSpy = jest.spyOn(hashedComparerStub, 'compare')
    await sut.auth(makeAuthentication())
    expect(compareSpy).toHaveBeenCalledWith(makeAuthentication().password, makeFakeAccount().password)
  })
})
