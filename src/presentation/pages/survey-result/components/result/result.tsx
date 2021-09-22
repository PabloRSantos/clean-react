import { Calendar } from '@/presentation/components'
import React from 'react'
import FlipMove from 'react-flip-move'
import Styles from './result-styles.scss'
import { useHistory } from 'react-router'
import { LoadSurveyResult } from '@/domain/usecases'

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
        {surveyResult.answers.map(answer => (
          <li data-testid="answer-wrap" key={answer.answer} className={answer.isCurrentAccountAnswer ? Styles.active : ''}>
            {answer.image && <img data-testid="answer-image" src={answer.image} alt={answer.answer} />}
            <span data-testid="answer" className={Styles.answer}>{answer.answer}</span>
            <span data-testid="percent" className={Styles.percent}>{answer.percent}%</span>
          </li>
        ))}
      </FlipMove>
      <button onClick={goBack}>Voltar</button>
    </div>
  )
}
