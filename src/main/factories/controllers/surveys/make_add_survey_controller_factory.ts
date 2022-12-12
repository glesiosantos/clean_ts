import { DBAddSurvey } from '../../../../data/usecase/add-survey/db_add_survey'
import { SurveyMongoRepository } from '../../../../infra/db/survey_mongo_repository'
import { AddSurveyController } from '../../../../presentation/controllers/survey/add_survey_controller'
import { Controller } from '../../../../presentation/protocols'
import { makeAddSurveyValidationComposite } from './add_survey_validation_composite_factory'

export const makeAddSurveyController = (): Controller => {
  const addSurveyRepository = new SurveyMongoRepository()
  const dbAddSurvey = new DBAddSurvey(addSurveyRepository)
  return new AddSurveyController(makeAddSurveyValidationComposite(), dbAddSurvey)
}
