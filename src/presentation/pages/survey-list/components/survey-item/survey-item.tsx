import { SurveyModel } from '@/domain/models'
import { Icon, IconName } from '@/presentation/components'
import React from 'react'
import Styles from './survey-item-styles.scss'

type Props = {
  survey: SurveyModel
};

export const SurveyItem: React.FC<Props> = ({ survey }) => {
  return (
    <li className={Styles.surveyItemWrap}>
      <div className={Styles.surveyContent}>
        <Icon className={Styles.iconWrap} iconName={IconName.thumbUp} />
        <time>
          <span className={Styles.day}>{survey.date.getDate()}</span>
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