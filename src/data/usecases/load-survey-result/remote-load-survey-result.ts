import { HttpGetClient } from '@/data/protocols/http'
import { LoadSurveyResult } from '@/domain/usecases'

export class RemoteLoadSurveyResult implements LoadSurveyResult {
  constructor (
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<RemoteLoadSurveyResult.Model>
  ) {}

  async load (): Promise<LoadSurveyResult.Model> {
    await this.httpGetClient.get({ url: this.url })
    return null
  }
}

export namespace RemoteLoadSurveyResult {
  export type Model = {
    question: string
    date: string
    answers: [{
      image?: string
      answer: string
      count: number
      percent: number
    }]
  }
}
