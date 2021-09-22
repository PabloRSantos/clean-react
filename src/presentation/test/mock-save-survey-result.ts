import { mockSurveyResultModel } from '@/domain/test'
import { SaveSurveyResult } from '@/domain/usecases'

export class SaveSurveyResultSpy implements SaveSurveyResult {
  params: SaveSurveyResult.Params
  callsCount = 0
  surveyResult = mockSurveyResultModel()

  async save (params: SaveSurveyResult.Params): Promise<SaveSurveyResult.Model> {
    this.params = params
    this.callsCount++
    return this.surveyResult
  }
}
