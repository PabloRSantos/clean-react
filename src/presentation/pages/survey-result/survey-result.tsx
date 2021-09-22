import React, { useEffect, useState } from 'react'
import Styles from './survey-result-styles.scss'
import { Footer, Header, Loading, Error } from '@/presentation/components'
import { LoadSurveyResult } from '@/domain/usecases'
import { useErrorHandler } from '@/presentation/hooks'
import { Result } from './components'

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
        {state.surveyResult && <Result surveyResult={state.surveyResult} />}
        {state.isLoading && <Loading /> }
        {state.error && <Error error={state.error} reload={reload} /> }

      </div>
      <Footer />
    </div>
  )
}
