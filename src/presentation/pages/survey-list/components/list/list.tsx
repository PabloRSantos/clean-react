import { SurveyModel } from '@/domain/models'
import React, { useContext } from 'react'
import { SurveyContext, SurveyItem, SurveyItemEmpty } from '..'
import Styles from './list-styles.scss'

export const List: React.FC = () => {
  const { state } = useContext(SurveyContext)

  return (
    <ul className={Styles.listWrap}>
      {state.surveys.length
        ? state.surveys.map((survey: SurveyModel) => <SurveyItem key={survey.id} survey={survey}/>)
        : <SurveyItemEmpty />
      }
    </ul>
  )
}
