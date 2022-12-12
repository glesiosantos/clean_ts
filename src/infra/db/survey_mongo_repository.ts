import { AddSurveyModel, AddSurveyRepository } from '../../data/usecase/add-survey/add_survey_protocols'
import { MongoHelper } from './helpers/mongo_helper'

export class SurveyMongoRepository implements AddSurveyRepository {
  async add (surveyData: AddSurveyModel): Promise<void> {
    const surveyCollection = MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(surveyData)
  }
}
