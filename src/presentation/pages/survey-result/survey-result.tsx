import React, { useEffect, useState } from 'react'
import Styles from './survey-result-styles.scss'
import { Calendar, Footer, Header, Loading, Error } from '@/presentation/components'
import FlipMove from 'react-flip-move'
import { LoadSurveyResult } from '@/domain/usecases'
import { useErrorHandler } from '@/presentation/hooks'

type Props = {
  loadSurveyResult: LoadSurveyResult
}

export const SurveyResult: React.FC<Props> = ({ loadSurveyResult }) => {
  const handleError = useErrorHandler((error: Error) => {
    setState((oldState) => ({ ...oldState, surveyResult: null, error: error.message }))
  })

  const [state, setState] = useState({
    isLoading: false,
    error: '',
    reload: false,
    surveyResult: null as LoadSurveyResult.Model
  })

  useEffect(() => {
    loadSurveyResult.load()
      .then(surveyResult => setState(oldState => ({ ...oldState, surveyResult })))
      .catch(handleError)
  }, [state.reload])

  const reload = (): void => {
    setState((oldState) => ({
      surveyResult: null,
      reload: !oldState.reload,
      isLoading: false,
      error: ''
    }))
  }

  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div data-testid="survey-result" className={Styles.contentWrap}>
        {state.surveyResult && (
          <>
            <hgroup>
              <Calendar date={state.surveyResult.date} className={Styles.calendarWrap}/>
              <h2>{state.surveyResult.question}</h2>
            </hgroup>
            <FlipMove data-testid="answers" className={Styles.answersList}>
              {state.surveyResult.answers.map(answer => (
                <li data-testid="answer-wrap" key={answer.answer} className={answer.isCurrentAccountAnswer ? Styles.active : ''}>
                  {answer.image && <img data-testid="answer-image" src={answer.image} alt={answer.answer} />}
                  <span data-testid="answer" className={Styles.answer}>{answer.answer}</span>
                  <span data-testid="percent" className={Styles.percent}>{answer.percent}%</span>
                </li>
              ))}
            </FlipMove>
            <button>Voltar</button>
          </>
        )}
        {state.isLoading && <Loading /> }
        {state.error && <Error error={state.error} reload={reload} /> }

      </div>
      <Footer />
    </div>
  )
}
