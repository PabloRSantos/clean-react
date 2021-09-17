import { Footer, Header } from '@/presentation/components'
import React, { useEffect, useState } from 'react'
import { SurveyItem, SurveyItemEmpty } from '@/presentation/pages/survey-list/components'
import Styles from './survey-list-styles.scss'
import { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import { SurveyModel } from '@/domain/models'

type Props = {
  loadSurveyList: LoadSurveyList
}

type State = {
  surveys: SurveyModel[]
  error: string
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }) => {
  const [state, setState] = useState<State>({
    surveys: [],
    error: ''
  })

  useEffect(() => {
    loadSurveyList.loadAll()
      .then(surveys => setState(prevState => ({ ...prevState, surveys })))
      .catch(error => setState(prevState => ({ ...prevState, error: error.message })))
  }, [])

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        {state.error ? (
          <div>
            <span>{state.error}</span>
            <button>Recarregar</button>
          </div>
        ) : (
          <ul>
            {state.surveys.length
              ? state.surveys.map(survey => <SurveyItem key={survey.id} survey={survey}/>)
              : <SurveyItemEmpty />
            }
          </ul>
        )}
      </div>
      <Footer />
    </div>
  )
}

export { SurveyList }
