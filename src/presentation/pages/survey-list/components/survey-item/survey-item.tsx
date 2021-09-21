import { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import { Calendar, Icon, IconName } from '@/presentation/components'
import React from 'react'
import { Link } from 'react-router-dom'
import Styles from './survey-item-styles.scss'

type Props = {
  survey: LoadSurveyList.Model
};

export const SurveyItem: React.FC<Props> = ({ survey }) => {
  const iconName = survey.didAnswer ? IconName.thumbUp : IconName.thumbDown

  return (
    <li className={Styles.surveyItemWrap} data-testid="survey-item">
      <div className={Styles.surveyContent}>
        <Icon className={Styles.iconWrap} iconName={iconName} />
        <Calendar date={survey.date} className={Styles.calendarWrap} />
        <p data-testid="question">{survey.question}</p>
      </div>
      <footer>
        <Link to={`/surveys/${survey.id}`}>
          Ver Resultado
        </Link>
      </footer>
    </li>
  )
}
