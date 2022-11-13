import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http_helper'
import { SignInController } from './signin'

type SutType = {
  sut: SignInController
}

const makeSut = (): SutType => {
  const sut = new SignInController()
  return { sut }
}

describe('Sign In Controller', () => {
  it('should return badRequest when no email is provided ', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        passwrod: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  it('should return badRequest when no password is provided ', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })
})
