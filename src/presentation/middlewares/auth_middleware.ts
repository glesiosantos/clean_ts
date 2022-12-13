import { AccessDeneidError } from '../errors'
import { forbidden } from '../helpers/http/http_helper'
import { HttpRequest, HttpResponse } from '../protocols'
import { Middleware } from '../protocols/middlewares'

export class AuthMiddlewares implements Middleware {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        return new Promise(resolve => resolve(forbidden(new AccessDeneidError())))
    }
}
