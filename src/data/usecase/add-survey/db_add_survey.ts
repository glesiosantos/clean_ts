import { AddSurveyModel, AddSurveyRepository } from './add_survey_protocols'

export class DBAddSurvey implements AddSurveyRepository {
  constructor(private readonly addSurveyRepository: AddSurveyRepository) { }
  async add (surveyData: AddSurveyModel): Promise<void> {
    await this.addSurveyRepository.add(surveyData)
  }
}
