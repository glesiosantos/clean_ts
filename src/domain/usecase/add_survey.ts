export type SurveyAnswerModel = {
  image: string
  answer: string
}

export type AddSurveyModel = {
  question: string
  answers: SurveyAnswerModel[]
}

export interface AddSurvey {
  add(input: AddSurveyModel): Promise<void>
}
