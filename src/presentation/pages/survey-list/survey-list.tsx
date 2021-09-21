import { Footer, Header, Error } from '@/presentation/components'
import React, { useEffect, useState } from 'react'
import {
  List
} from '@/presentation/pages/survey-list/components'
import Styles from './survey-list-styles.scss'
import { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import { useErrorHandler } from '@/presentation/hooks'

type Props = {
  loadSurveyList: LoadSurveyList
};

type State = {
  surveys: LoadSurveyList.Model[]
  error: string
  reload: boolean
};

const SurveyList: React.FC<Props> = ({ loadSurveyList }) => {
  const handleError = useErrorHandler((error: Error) => {
    setState((prevState) => ({ ...prevState, error: error.message }))
  })
  const [state, setState] = useState<State>({
    surveys: [],
    error: '',
    reload: false
  })

  useEffect(() => {
    loadSurveyList
      .loadAll()
      .then((surveys) => setState((prevState) => ({ ...prevState, surveys })))
      .catch(handleError)
  }, [state.reload])

  const reload = (): void => {
    setState((oldState) => ({
      surveys: [],
      error: '',
      reload: !oldState.reload
    }))
  }

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        {state.error ? (
          <Error error={state.error} reload={reload} />
        ) : (
          <List surveys={state.surveys} />
        )}
      </div>
      <Footer />
    </div>
  )
}

export { SurveyList }
