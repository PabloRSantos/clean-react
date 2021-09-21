import React from 'react'
import Styles from './survey-result-styles.scss'
import { Footer, Header, Loading } from '@/presentation/components'
import FlipMove from 'react-flip-move'

export const SurveyResult: React.FC = () => {
  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Qual é seu framework web favorito</h2>
        <FlipMove className={Styles.answersList}>
          <li>
            <img src="" />
            <span className={Styles.answer}>ReactJS</span>
            <span className={Styles.percent}>50%</span>
          </li>
        </FlipMove>
        <button>Voltar</button>
        {false && <Loading /> }
      </div>
      <Footer />
    </div>
  )
}