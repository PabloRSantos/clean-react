import { Calendar } from '@/presentation/components'
import React from 'react'
import FlipMove from 'react-flip-move'
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
        <h2>{surveyResult.question}</h2>
      </hgroup>
      <FlipMove data-testid="answers" className={Styles.answersList}>
        <>
          {surveyResult.answers.map(answer => <SurveyResultAnswer key={answer.answer} answer={answer} />)}
        </>
      </FlipMove>
      <button onClick={goBack}>Voltar</button>
    </div>
  )
}
