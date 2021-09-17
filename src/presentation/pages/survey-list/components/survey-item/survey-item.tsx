import { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import { Icon, IconName } from '@/presentation/components'
import React from 'react'
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
        <time>
          <span className={Styles.day}>{survey.date.getDate().toString().padStart(2, '0')}</span>
          <span className={Styles.month}>
            {survey.date
              .toLocaleString('pt-BR', { month: 'short' })
              .replace('.', '')}
          </span>
          <span className={Styles.year}>{survey.date.getFullYear()}</span>
        </time>
        <p>{survey.question}</p>
      </div>
      <footer>Ver Resultado</footer>
    </li>
  )
}
