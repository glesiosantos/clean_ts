import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LogErrorControllerDecorator } from './log_error_controller_decorator'

type SutTypes = {
  sut: LogErrorControllerDecorator
  controllerStub: Controller
}

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
      return new Promise(resolve => resolve({
        statusCode: 200,
        body: {
          valid_id: 'valid_id',
          name: 'valid_name',
          email: 'valid_email@mail.com',
          password: 'hashed_password'
        }
      }))
    }
  }

  return new ControllerStub()
}

const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const sut = new LogErrorControllerDecorator(controllerStub)
  return { sut, controllerStub }
}

describe('Name of the group', () => {
  it('should calls controller handler', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_mail@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })

  // it('should throw when controller handler throws', async () => {

  //   const { sut, controllerStub } = makeSut()
  //   jest.spyOn(controllerStub, 'handle').mockImplementationOnce(() => { throw new Error() })
  //   const httpRequest = {
  //     body: {
  //       name: 'any_name',
  //       email: 'any_mail@email.com',
  //       password: 'any_password',
  //       passwordConfirmation: 'any_password'
  //     }
  //   }
  //   await sut.handle(httpRequest)
  //   expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  // })

  it('should return the same result of the controller', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_mail@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: {
        valid_id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email@mail.com',
        password: 'hashed_password'
      }
    })
  })
})
