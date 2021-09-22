import React, { useEffect, useState } from 'react'
import Styles from './survey-result-styles.scss'
import { Footer, Header, Loading, Error } from '@/presentation/components'
import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases'
import { useErrorHandler } from '@/presentation/hooks'
import { Result, SurveyResultContext } from './components'

type Props = {
  loadSurveyResult: LoadSurveyResult
  saveSurveyResult: SaveSurveyResult
}

export const SurveyResult: React.FC<Props> = ({ loadSurveyResult, saveSurveyResult }) => {
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

  const onAnswer = (answer: string): void => {
    setState(oldState => ({ ...oldState, isLoading: true }))
    saveSurveyResult.save({ answer })
      .then()
      .catch()
  }

  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <SurveyResultContext.Provider value={{ onAnswer }}>
        <div data-testid="survey-result" className={Styles.contentWrap}>
          {state.surveyResult && <Result surveyResult={state.surveyResult} />}
          {state.isLoading && <Loading /> }
          {state.error && <Error error={state.error} reload={reload} /> }
        </div>
      </SurveyResultContext.Provider>
      <Footer />
    </div>
  )
}
