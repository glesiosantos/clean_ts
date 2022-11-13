import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http_helper'
import { SignInController } from './signin'

describe('Sign In Controller', () => {
  it('should return badRequest when no email is provided ', async () => {
    const sut = new SignInController()
    const httpRequest = {
      body: {
        passwrod: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })
})
