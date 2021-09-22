import faker from 'faker'
import { LoadSurveyResult, SaveSurveyResult } from '../usecases'

export const mockSurveyResultModel = (): LoadSurveyResult.Model => ({
  question: faker.random.words(10),
  date: faker.date.recent(),
  answers: [
    {
      image: faker.internet.url(),
      answer: faker.random.word(),
      count: faker.datatype.number(),
      percent: faker.datatype.number(100),
      isCurrentAccountAnswer: true
    },
    {
      answer: faker.random.word(),
      count: faker.datatype.number(),
      percent: faker.datatype.number(100),
      isCurrentAccountAnswer: false
    }
  ]
}
)

export const mockSaveSurveyResultParams = (): SaveSurveyResult.Params => ({
  answer: faker.random.words()
})
