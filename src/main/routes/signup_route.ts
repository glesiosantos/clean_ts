import { Router } from 'express'
import { expressRouteAdapter } from '../adapters/express/express_routes_adapter'
import { makeSignUpController } from '../factories/sign_up/signup_factory'

export default (router: Router): void => {
  router.post('/signup', expressRouteAdapter(makeSignUpController()))
}
