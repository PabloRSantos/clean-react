import React from 'react'
import { SurveyResult } from '@/presentation/pages'
import { makeRemoteLoadSurveyResult, makeRemoteSaveSurveyResult } from '@/main/factories/usecases'
import { useParams } from 'react-router'

type Params = {
  id: string
}

export const makeSurveyResult: React.FC = () => {
  const params = useParams()
  const { id } = params as Params

  return (
    <SurveyResult
      saveSurveyResult={makeRemoteSaveSurveyResult(id)}
      loadSurveyResult={makeRemoteLoadSurveyResult(id)}
    />
  )
}
