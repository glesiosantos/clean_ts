import { Router } from 'express'
import { expressRouteAdapter } from '../adapters/express/express_routes_adapter'
import { makeAddSurveyController } from '../factories/controllers/surveys/make_add_survey_controller_factory'

export default (router: Router): void => {
  router.post('/surveys', expressRouteAdapter(makeAddSurveyController()))
}
