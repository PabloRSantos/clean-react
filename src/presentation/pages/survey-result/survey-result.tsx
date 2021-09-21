import React, { useEffect, useState } from 'react'
import Styles from './survey-result-styles.scss'
import { Calendar, Footer, Header, Loading, Error } from '@/presentation/components'
import FlipMove from 'react-flip-move'
import { LoadSurveyResult } from '@/domain/usecases'

type Props = {
  loadSurveyResult: LoadSurveyResult
}

export const SurveyResult: React.FC<Props> = ({ loadSurveyResult }) => {
  const [state] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model
  })

  useEffect(() => {
    loadSurveyResult.load()
      .then()
      .catch()
  }, [])

  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div data-testid="survey-result" className={Styles.contentWrap}>
        {state.surveyResult && (
          <>
            <hgroup>
              <Calendar date={new Date()} className={Styles.calendarWrap}/>
              <h2>Qual é seu framework web favorito</h2>
            </hgroup>
            <FlipMove className={Styles.answersList}>
              <li>
                <img src="" />
                <span className={Styles.answer}>ReactJS</span>
                <span className={Styles.percent}>50%</span>
              </li>
            </FlipMove>
            <button>Voltar</button>
          </>
        )}
        {state.isLoading && <Loading /> }
        {state.error && <Error error={state.error} reload={() => {
          // nothing
        }} /> }

      </div>
      <Footer />
    </div>
  )
}
