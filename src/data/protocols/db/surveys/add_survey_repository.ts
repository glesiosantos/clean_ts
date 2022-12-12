import { AddSurveyModel } from '../../../../domain/usecase/add_survey'

export interface AddSurveyRepository {
  add (surveyData: AddSurveyModel): Promise<void>
}
