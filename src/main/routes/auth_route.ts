import { Router } from 'express'
import { expressRouteAdapter } from '../adapters/express/express_routes_adapter'
import { makeSignInController } from '../factories/controllers/sign_in/signin_controller_factory'
import { makeSignUpController } from '../factories/controllers/sign_up/signup_controller_factory'

export default (router: Router): void => {
  router.post('/signup', expressRouteAdapter(makeSignUpController()))
  router.post('/signin', expressRouteAdapter(makeSignInController()))
}
