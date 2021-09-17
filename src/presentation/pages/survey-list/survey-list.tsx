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
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }) => {
  const [state, setState] = useState<State>({
    surveys: []
  })

  useEffect(() => {
    loadSurveyList.loadAll()
      .then(surveys => setState({ surveys }))
  }, [])

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul>
          {state.surveys.length
            ? state.surveys.map(survey => <SurveyItem key={survey.id} survey={survey}/>)
            : <SurveyItemEmpty />
          }
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export { SurveyList }
