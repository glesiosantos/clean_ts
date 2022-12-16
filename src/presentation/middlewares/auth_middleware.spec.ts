import { AccessDeneidError } from '../errors'
import { forbidden } from '../helpers/http/http_helper'
import { HttpRequest } from '../protocols'
import { AuthMiddlewares } from './auth_middleware'
import { LoadAccountByToken } from '../../domain/usecase/load_account_by_token'
import { AccountModel } from '../../domain/models/account_model'

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com.br',
  password: 'hashed_password'
})

type SutTypes = {
  sut: AuthMiddlewares
  loadAccountByTokenStub: LoadAccountByToken
}

const makeSut = (): SutTypes => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load (accountToken: string, role?: string): Promise<AccountModel | null> {
      return new Promise(resolve => resolve(makeFakeAccount()))
    }
  }

  const loadAccountByTokenStub = new LoadAccountByTokenStub()
  const sut = new AuthMiddlewares(loadAccountByTokenStub)
  return { sut, loadAccountByTokenStub }
}

describe('Auth Middlewares', () => {
  it('should return 403 when no x-access-token in hearders', async () => {
    const { sut } = makeSut()
    const httpRequest: HttpRequest = {}
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(forbidden(new AccessDeneidError()))
  })

  it('should calls LoadAccountByToken with correct values', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load')
    const httpRequest: HttpRequest = {
      headers: {
        'x-access-token': 'any_token'
      }
    }
    await sut.handle(httpRequest)
    expect(loadSpy).toHaveBeenCalledWith('any_token')
  })
})
