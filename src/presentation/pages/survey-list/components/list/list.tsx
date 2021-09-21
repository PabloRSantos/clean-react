import { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import React from 'react'
import { SurveyItem, SurveyItemEmpty } from '..'
import Styles from './list-styles.scss'

type Props = {
  surveys: LoadSurveyList.Model[]
}

export const List: React.FC<Props> = ({ surveys }) => {
  return (
    <ul className={Styles.listWrap}>
      {surveys.length
        ? surveys.map((survey: LoadSurveyList.Model) => <SurveyItem key={survey.id} survey={survey}/>)
        : <SurveyItemEmpty />
      }
    </ul>
  )
}
