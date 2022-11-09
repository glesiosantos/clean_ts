import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LogErrorControllerDecorator } from './log_error_controller_decorator'

describe('Name of the group', () => {
  it('should calls controller handler', async () => {
    class ControllerStub implements Controller {
      async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        return new Promise(resolve => resolve({
          statusCode: 200,
          body: {
            name: 'any_name'
          }
        }))
      }
    }

    const controllerStub = new ControllerStub()
    const sut = new LogErrorControllerDecorator(controllerStub)
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
})
