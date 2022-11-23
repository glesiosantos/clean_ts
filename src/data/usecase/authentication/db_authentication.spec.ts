import { Authentication, AuthenticationModel } from '../../../domain/usecase/authentication'
import { HashedComparer } from '../../protocols/cryptograph/hashed_comparer'
import { TokenGenerator } from '../../protocols/cryptograph/token_generator'
import { LoadAccountByEmailRepository } from '../../protocols/db/load_account_by_email_repository'
import { AccountModel } from '../add-account/db_add_account_protocols'
import { DbAuthentication } from './db_authentication'

type SutType = {
  sut: Authentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  hashedComparerStub: HashedComparer
  tokenGeneratorStub: TokenGenerator
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

const makeTokenGenerator = (): TokenGenerator => {
  class TokenGeneratorStub implements TokenGenerator {
    async generate(id: string): Promise<String> {
      return new Promise(resolve => resolve('any_token'))
    }
  }

  return new TokenGeneratorStub()
}

const makeSut = (): SutType => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
  const hashedComparerStub = makeHashedComparer()
  const tokenGeneratorStub = makeTokenGenerator()
  const sut = new DbAuthentication(loadAccountByEmailRepositoryStub, hashedComparerStub, tokenGeneratorStub)
  return { sut, loadAccountByEmailRepositoryStub, hashedComparerStub, tokenGeneratorStub }
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

  it('should calls HashedComparer with correct values', async () => {
    const { sut, hashedComparerStub } = makeSut()
    const compareSpy = jest.spyOn(hashedComparerStub, 'compare')
    await sut.auth(makeAuthentication())
    expect(compareSpy).toHaveBeenCalledWith(makeAuthentication().password, makeFakeAccount().password)
  })

  it('should return null when HashedComparer return false', async () => {
    const { sut, hashedComparerStub } = makeSut()
    jest.spyOn(hashedComparerStub, 'compare').mockReturnValueOnce(new Promise(resolve => resolve(false)))
    const accessToken = await sut.auth(makeAuthentication())
    expect(accessToken).toBeNull()
  })

  it('should throw when HashedComparer throws', async () => {
    const { sut, hashedComparerStub } = makeSut()
    jest.spyOn(hashedComparerStub, 'compare').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.auth(makeAuthentication())
    await expect(promise).rejects.toThrow()
  })

  it('should call TokenGeneration with correct id', async () => {
    const { sut, tokenGeneratorStub } = makeSut()
    const generateSpy = jest.spyOn(tokenGeneratorStub, 'generate')
    await sut.auth(makeAuthentication())
    expect(generateSpy).toHaveBeenCalledWith(makeFakeAccount().id)
  })

  it('should return null when TokenGeneration throws', async () => {
    const { sut, tokenGeneratorStub } = makeSut()
    jest.spyOn(tokenGeneratorStub, 'generate').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.auth(makeAuthentication())
    await expect(promise).rejects.toThrow()
  })
})
