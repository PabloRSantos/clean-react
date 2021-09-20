import faker from 'faker'
import { RemoteLoadSurveyResult } from '../usecases/load-survey-result/remote-load-survey-result'

export const mockRemoteSurveyResultModel = (): RemoteLoadSurveyResult.Model => ({
  question: faker.random.words(),
  date: new Date().toISOString(),
  answers: [
    {
      image: faker.internet.url(),
      answer: faker.random.word(),
      count: faker.datatype.number(),
      percent: faker.datatype.number(100)
    },
    {
      answer: faker.random.word(),
      count: faker.datatype.number(),
      percent: faker.datatype.number(100)
    }
  ]
}
)
