import { Calendar } from '@/presentation/components'
import React from 'react'
import Styles from './result-styles.scss'
import { useHistory } from 'react-router'
import { LoadSurveyResult } from '@/domain/usecases'
import { SurveyResultAnswer } from '@/presentation/pages/survey-result/components'

type Props = {
  surveyResult: LoadSurveyResult.Model
}

export const Result: React.FC<Props> = ({ surveyResult }) => {
  const { goBack } = useHistory()

  return (
    <div className={Styles.resultWrap}>
      <hgroup>
        <Calendar date={surveyResult.date} className={Styles.calendarWrap}/>
        <h2 data-testid="question">{surveyResult.question}</h2>
      </hgroup>
      <ul data-testid="answers" className={Styles.answersList}>
        {surveyResult.answers.map(answer => <SurveyResultAnswer key={answer.answer} answer={answer} />)}
      </ul>
      <button data-testid="back-button" onClick={goBack}>Voltar</button>
    </div>
  )
}
