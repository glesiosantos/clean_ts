import { Router } from 'express'
import { expressRouteAdapter } from '../adapters/express_routes_adapter'
import { makeSignUpController } from '../factories/sign_up_factory'

export default (router: Router): void => {
  router.post('/signup', expressRouteAdapter(makeSignUpController()))
}
