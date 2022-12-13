import { AccessDeneidError } from '../errors'
import { forbidden } from '../helpers/http/http_helper'
import { HttpRequest } from '../protocols'
import { AuthMiddlewares } from './auth_middleware'

describe('Auth Middlewares', () => {
    it('should return 403 when no x-access-token in hearders', async () => {
        const sut = new AuthMiddlewares()
        const httpRequest: HttpRequest = {}
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(forbidden(new AccessDeneidError()))
    })
})
