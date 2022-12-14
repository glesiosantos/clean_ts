import { AccountModel } from '../../../domain/models/account_model'
import { DbAuthentication } from './db_authentication'
import { Authentication, AuthenticationModel, HashedComparer, LoadAccountByEmailRepository, Encrypter, UpdateAccessTokenRepository } from './db_authetication_protocols'

type SutType = {
  sut: Authentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  hashedComparerStub: HashedComparer
  encrypterStub: Encrypter
  updateAccessTokenRepositoryStub: UpdateAccessTokenRepository
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
    async loadByEmail(email: string): Promise<AccountModel> {
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

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async generate(id: string): Promise<string> {
      return new Promise(resolve => resolve('any_token'))
    }
  }

  return new EncrypterStub()
}

const makeUpdateAccessTokenRepository = (): UpdateAccessTokenRepository => {
  class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
    async updateAccessToken(id: string, token: string): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }

  return new UpdateAccessTokenRepositoryStub()
}

const makeSut = (): SutType => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
  const hashedComparerStub = makeHashedComparer()
  const encrypterStub = makeEncrypter()
  const updateAccessTokenRepositoryStub = makeUpdateAccessTokenRepository()
  const sut = new DbAuthentication(loadAccountByEmailRepositoryStub, hashedComparerStub, encrypterStub, updateAccessTokenRepositoryStub)
  return { sut, loadAccountByEmailRepositoryStub, hashedComparerStub, encrypterStub, updateAccessTokenRepositoryStub }
}

describe('DB Authentication UseCase', () => {
  it('should calls LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.auth(makeAuthentication())
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  it('should throw when LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.auth(makeAuthentication())
    await expect(promise).rejects.toThrow()
  })

  it('should return null when LoadAccountByEmailRepository return null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(null)
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

  it('should call Encrypter with correct id', async () => {
    const { sut, encrypterStub } = makeSut()
    const generateSpy = jest.spyOn(encrypterStub, 'generate')
    await sut.auth(makeAuthentication())
    expect(generateSpy).toHaveBeenCalledWith(makeFakeAccount().id)
  })

  it('should return throws when Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'generate').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.auth(makeAuthentication())
    await expect(promise).rejects.toThrow()
  })

  it('should return a Token on success', async () => {
    const { sut } = makeSut()
    const accessToken = await sut.auth(makeAuthentication())
    expect(accessToken).toBe('any_token')
  })

  it('should calls UpdateAccessTokenRepository with correct values', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut()
    const udpdateSpy = jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken')
    await sut.auth(makeAuthentication())
    expect(udpdateSpy).toHaveBeenCalledWith(makeFakeAccount().id, 'any_token')
  })

  it('should return throws when UpdateAccessTokenRepository throws', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut()
    jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.auth(makeAuthentication())
    await expect(promise).rejects.toThrow()
  })
})
